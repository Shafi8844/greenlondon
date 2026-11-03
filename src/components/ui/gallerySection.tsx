import Image from "next/image";

const GALLERY_IMAGES = [
  "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1441974232041-bc29f78ab8bd?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1489987707025-afc232f7bdaf?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1476820865390-c52aeebb9891?auto=format&fit=crop&w=800&q=80",
];

const GALLERY_CAPTIONS = [
  "Tool school, Mile End Park",
  "Hedgerow planting, Haringey",
  "Park conservation day",
  "Winter coat drive",
  "Community garden prep",
  "Rewilding session, Camden",
  "River foreshore cleanup",
  "Orchard pruning, Ealing",
];

const GallerySection = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="text-center">
        <p className="text-sm font-semibold tracking-[0.2em] text-[#3E7A52] uppercase">
          From the field
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-[#14231B] sm:text-5xl md:text-6xl">
          Our city, <span className="text-[#1B9A5E]">in action.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#5C6B61] sm:text-lg">
          Photographs sent in by volunteers from past cleanups, plantations and
          donation drives across London.
        </p>
      </div>

      {/* Uniform image sizes in an equal grid — mobile 2-up, tablet 3-up, desktop 4-up */}
      <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
        {GALLERY_IMAGES.map((src, i) => (
          <figure
            key={src}
            className="group relative overflow-hidden rounded-2xl"
          >
            <Image
              src={src}
              alt={GALLERY_CAPTIONS[i]}
              width={800}
              height={600}
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
              className="aspect-4/3 w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#14231B]/70 to-transparent px-3 pt-8 pb-2.5 text-xs font-medium text-white">
              {GALLERY_CAPTIONS[i]}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};

export default GallerySection;
