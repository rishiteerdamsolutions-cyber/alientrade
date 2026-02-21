export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-brand-brown mb-6">Our Story</h1>
      <p className="text-brand-brown leading-relaxed mb-6">
        AlienTrade was born from a simple idea: NRIs around the world deserve access to the same
        authentic, homemade-quality spices we use in our own kitchens every day.
      </p>
      <p className="text-brand-brown leading-relaxed mb-6">
        Local farmers bring their finest sun-dried red chillies and premium turmeric rhizomes to us,
        and powder them before our eyes. We take personal care at every step — just like we do for
        our own family. No additives, no artificial colors, no shortcuts — just pure, potent
        spices that transform every dish.
      </p>
      <p className="text-brand-brown leading-relaxed mb-6">
        Whether you&apos;re in the USA, UK, Canada, or Australia, we bring a taste of home to your
        doorstep. Because the best spices shouldn&apos;t be a luxury — they should be a given.
      </p>
      <h2 className="text-xl font-bold text-brand-brown mt-10 mb-4">Our Promise</h2>
      <ul className="space-y-2 text-brand-brown">
        <li className="flex items-start gap-2">
          <span className="text-brand-green">✓</span> 100% pure, no additives
        </li>
        <li className="flex items-start gap-2">
          <span className="text-brand-green">✓</span> Farmers bring & powder before our eyes
        </li>
        <li className="flex items-start gap-2">
          <span className="text-brand-green">✓</span> Ground fresh, just like home
        </li>
        <li className="flex items-start gap-2">
          <span className="text-brand-green">✓</span> Worldwide shipping to NRIs
        </li>
      </ul>
    </div>
  );
}
