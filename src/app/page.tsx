import Banner from "@/components/ui/banner";
import EventList from "@/components/ui/EventList";
import FeaturesSection from "@/components/ui/featuresSection";
import GallerySection from "@/components/ui/gallerySection";
import NewsletterSection from "@/components/ui/newsletterSection";
import { apiUrl } from "@/lib/api-url";

export default function Home() {
  return (
    <main>
      <div className="container-custom">
        <Banner />
      </div>

      {/* Recent upcoming events — the API uses MongoDB's .limit(6) for this section */}
      <section className="py-16 sm:py-20">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-sm font-semibold tracking-[0.2em] text-[#3E7A52] uppercase">
              What&apos;s coming up
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#14231B] sm:text-5xl md:text-6xl">
              Next weeks in <span className="text-[#1B9A5E]">green.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5C6B61] sm:text-lg">
              The six soonest community events — created by volunteers like you,
              straight from the database.
            </p>

            <div className="mt-12 text-left">
              <EventList url={apiUrl("/events/featured")} />
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom pt-16">
        <FeaturesSection />
        <GallerySection />
        <NewsletterSection />
      </div>
    </main>
  );
}
