"use client";
import { useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { readJwt } from "@/lib/jwt";

export default function ReviewSection({ doctorId }) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState([]);
  const [canReview, setCanReview] = useState(false);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    if (!doctorId) return;

    setLoading(true);

    // Load Reviews
    try {
      const reviewRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews/${doctorId}`);
      if (reviewRes.ok) {
        setReviews(await reviewRes.json());
      }
    } catch (err) {
      console.error("Failed to load reviews", err);
    }

    // Check if user can review
    if (session?.user?.email && readJwt()) {
      try {
        const ap = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/appointments?email=${session.user.email}`,
          {
            headers: { Authorization: `Bearer ${readJwt()}` },
          }
        );

        if (ap.ok) {
          const items = await ap.json();
          setCanReview(items.some((x) => x.doctorId === doctorId));
        } else {
          setCanReview(false);
        }
      } catch (err) {
        console.error("Failed to fetch appointments", err);
        setCanReview(false);
      }
    } else {
      setCanReview(false);
    }

    setLoading(false);
  };

useEffect(() => {
  if (doctorId) {
    window.location.reload();  // ✅ doctorId পরিবর্তন হলে পেজ রিলোড হবে যাতে নতুন doctor এর review দেখায়
  }
}, [doctorId, session?.user?.email]);  // ✅ এখানে session ও doctorId দেয়া হয়েছে

  const onSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const rating = form.rating.value;
    const comment = form.comment.value;

    if (!rating || !comment) {
      return toast.error("Please select rating and write a comment");
    }

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${readJwt()}`,
        },
        body: JSON.stringify({
          doctorId,
          rating: Number(rating),
          comment,
          userEmail: session.user.email,
        }),
      });

      if (res.ok) {
        toast.success("Review submitted successfully!");
        form.reset();
        load();
      } else {
        toast.error("Failed to submit review");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-2xl font-bold">Patient Reviews</h2>

      {loading ? (
        <p>Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-sm text-gray-500">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((r, i) => (
            <div key={i} className="card bg-base-100 p-4 shadow">
              <div className="flex items-center justify-between">
                <span className="font-semibold">⭐ {r.rating}</span>
                <span className="text-xs text-gray-500">
                  {r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ""}
                </span>
              </div>
              <p className="mt-2">{r.comment}</p>
            </div>
          ))}
        </div>
      )}

      {session?.user && (
        <>
          {canReview ? (
            <form onSubmit={onSubmit} className="mt-8 space-y-4">
              <h3 className="text-xl font-semibold">Write a Review</h3>
              <select name="rating" className="select select-bordered w-full" defaultValue="">
                <option value="" disabled>Select Rating</option>
                <option value="5">5 - Excellent</option>
                <option value="4">4 - Very Good</option>
                <option value="3">3 - Good</option>
                <option value="2">2 - Fair</option>
                <option value="1">1 - Poor</option>
              </select>

              <textarea
                name="comment"
                className="textarea textarea-bordered w-full h-32"
                placeholder="Share your experience with this doctor..."
                required
              />

              <button type="submit" className="btn btn-primary">
                Submit Review
              </button>
            </form>
          ) : (
            <p className="text-sm text-gray-500 mt-4">
              You can only leave a review after you have completed an appointment with this doctor.
            </p>
          )}
        </>
      )}
    </section>
  );
}