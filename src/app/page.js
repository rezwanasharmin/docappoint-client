import HeroSlider from "@/components/HeroSlider";
import DoctorCard from "@/components/DoctorCard";

async function getTop() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/doctors/top`, { cache: "no-store" });
  return res.json();
}

export const metadata = {
  title: "Home",
  description: "Find top-rated doctors and book appointments.",
};

export default async function Home() {
  const top = await getTop();
  return (
    <>
      <HeroSlider />
      <section className="container mx-auto py-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Top Rated Doctors</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {top.map((d) => <DoctorCard key={d._id} doctor={d} />)}
        </div>
      </section>
      {/* How It Works Section - Blue Theme */}
<section className="bg-gradient-to-b from-blue-50 to-white dark:from-base-200 py-20">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-white">
      How It Works
    </h2>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          step: "01",
          title: "Search",
          desc: "Browse doctors by name, specialty, and location",
          color: "from-blue-600 to-cyan-500"
        },
        {
          step: "02",
          title: "Book",
          desc: "Pick a suitable time slot and confirm instantly",
          color: "from-indigo-600 to-blue-600"
        },
        {
          step: "03",
          title: "Visit",
          desc: "Visit the doctor and share your valuable review",
          color: "from-sky-600 to-blue-500"
        },
      ].map((item, i) => (
        <div
          key={i}
          className="group bg-white dark:bg-base-100 rounded-3xl p-10 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 border border-blue-100 hover:border-blue-300 relative overflow-hidden"
        >
          {/* Background Accent */}
          <div className={`absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br ${item.color} opacity-10 group-hover:opacity-20 rounded-full transition-all duration-700`} />
          
          <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white text-4xl font-bold mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            {item.step}
          </div>
          
          <h3 className="text-3xl font-semibold mb-4 text-gray-800 dark:text-white">{item.title}</h3>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Specialties We Cover - Colorful Blue Theme */}
<section className="py-20 bg-white dark:bg-base-100">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-800 dark:text-white">
      Specialties We Cover
    </h2>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        "Cardiology", "Dermatology", "Pediatrics", "Neurology",
        "Orthopedics", "ENT", "Dentistry", "Psychiatry",
        "Gynecology", "Ophthalmology", "General Medicine", "Surgery"
      ].map((specialty, i) => (
        <div
          key={i}
          className="group bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-base-200 dark:to-base-300 hover:from-blue-600 hover:to-indigo-600 border border-blue-200 hover:border-transparent rounded-3xl p-8 text-center font-semibold text-xl transition-all duration-500 hover:scale-105 hover:text-white hover:shadow-2xl cursor-pointer flex items-center justify-center min-h-[140px]"
        >
          {specialty}
        </div>
      ))}
    </div>
  </div>
</section>
    </>
  );
}

