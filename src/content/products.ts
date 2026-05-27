import type { Product } from './types';

export const products: Product[] = [
  {
    slug: 'garage-rolling-doors',
    name: { ar: 'أبواب الرول السحابة (الجراج)', en: 'Garage Rolling Doors' },
    hero: '/eatmed_product_photos_png/01_garage_rolling_doors.png',
    category: 'rolling',
    useCases: ['residential', 'commercial'],
    tagline: {
      ar: 'انسيابية، متينة، ومصنوعة من ألومنيوم Unicoil المطلي',
      en: 'Smooth, durable, made from coated Unicoil aluminium',
    },
    description: {
      ar: 'أبواب اعتمد للجراج تتميز بالانسيابية وتحمل الضغط. مصنوعة من سبائك الألومنيوم المطلية بالحديد المزدوج Unicoil المطلي حراريًا، بسماكة 0.45 - 0.5 - 0.6 مم. متوفرة حتى عرض 5.20 م وارتفاع 5.50 م، بألوان متعددة (بني، بيج، أزرق، أبيض، رصاصي). نظام أمان متطور يعكس الباب عند ملامسة أي جسم.',
      en: 'Eatmed garage doors deliver pressure-bearing smoothness. Made from aluminium alloy with thermally-coated double Unicoil galvanised steel at 0.45 / 0.5 / 0.6 mm. Available up to 5.20 m wide × 5.50 m high in wood, bronze, beige, blue, white and grey. Advanced safety system reverses on contact.',
    },
    highlights: [
      { ar: 'انسيابية وتحمل الضغط', en: 'Smooth operation, pressure-bearing' },
      { ar: 'مقاوم للصدأ والظروف الجوية', en: 'Rust and weather resistant' },
      { ar: 'مقاسات حتى 5.20 م × 5.50 م', en: 'Sizes up to 5.20 m × 5.50 m' },
      {
        ar: 'حساس أمان يعكس الباب عند الملامسة',
        en: 'Safety sensor reverses door on contact',
      },
      {
        ar: 'حاجز مطاطي يمنع الأتربة والحشرات',
        en: 'Rubber bottom seal blocks dust and insects',
      },
      {
        ar: '110/220 فولت - 50/60 هرتز مع فك يدوي عبر الهاندل',
        en: '110/220 V – 50/60 Hz with manual override via handle',
      },
    ],
    specs: [
      { label: { ar: 'السماكة', en: 'Thickness' }, value: { ar: '0.45 / 0.5 / 0.6 مم', en: '0.45 / 0.5 / 0.6 mm' } },
      { label: { ar: 'العرض الأقصى', en: 'Max width' }, value: { ar: '5.20 م', en: '5.20 m' } },
      { label: { ar: 'الارتفاع الأقصى', en: 'Max height' }, value: { ar: '5.50 م', en: '5.50 m' } },
      { label: { ar: 'الجهد', en: 'Voltage' }, value: { ar: '110/220 فولت', en: '110/220 V' } },
      { label: { ar: 'التردد', en: 'Frequency' }, value: { ar: '50/60 هرتز', en: '50/60 Hz' } },
    ],
    motors: ['liftmaster', 'gfa'],
    featured: true,
    bestFor: [
      { ar: 'الفلل والمنازل الخاصة', en: 'Villas and private residences' },
      { ar: 'الجراجات التجارية الخفيفة', en: 'Light commercial garages' },
    ],
    material: {
      ar: 'ألومنيوم Unicoil مطلي حراريًا',
      en: 'Thermally-coated Unicoil aluminium',
    },
    maxDimensions: { ar: 'حتى 5.20 م × 5.50 م', en: 'Up to 5.20 m × 5.50 m' },
    motorCompatibility: {
      ar: 'LiftMaster (أمريكي) أو GfA (ألماني)',
      en: 'LiftMaster (USA) or GfA (Germany)',
    },
    warranty: { ar: 'ضمان حسب نوع المحرك', en: 'Motor-dependent warranty' },
    commonApplications: [
      { ar: 'فلل سكنية', en: 'Residential villas' },
      { ar: 'مجمعات تجارية', en: 'Commercial compounds' },
      { ar: 'مستودعات صغيرة', en: 'Small warehouses' },
    ],
  },
  {
    slug: 'industrial-rolling-doors',
    name: { ar: 'الأبواب الصناعية السحاب', en: 'Industrial Rolling Doors' },
    hero: '/eatmed_product_photos_png/02_industrial_rolling_doors.png',
    category: 'rolling',
    useCases: ['industrial', 'commercial'],
    tagline: {
      ar: 'مصممة للضغط العالي ومقاسات تصل إلى 6 × 5.50 م',
      en: 'Built for heavy duty, sizes up to 6 × 5.50 m',
    },
    description: {
      ar: 'أبواب صناعية انسيابية تتحمل الضغط، مصنوعة من سبائك الألومنيوم Unicoil المطلية حراريًا بسماكة 0.7 مم. مقاومة للصدأ ولأقسى الظروف الجوية. تحتوي على شريط جانبي يجعل الباب ينزلق بسهولة وهدوء.',
      en: 'Heavy-duty industrial rolling doors at 0.7 mm Unicoil aluminium. Weather and corrosion resistant. Side strip enables smooth, quiet glide.',
    },
    highlights: [
      { ar: 'سماكة 0.7 مم', en: '0.7 mm thickness' },
      { ar: 'مقاسات حتى 6 م × 5.50 م', en: 'Sizes up to 6 m × 5.50 m' },
      { ar: 'نظام أمان متطور', en: 'Advanced safety system' },
      { ar: 'تشغيل كهربائي مع فك يدوي', en: 'Electric operation with manual override' },
    ],
    specs: [
      { label: { ar: 'السماكة', en: 'Thickness' }, value: { ar: '0.7 مم', en: '0.7 mm' } },
      { label: { ar: 'العرض الأقصى', en: 'Max width' }, value: { ar: '6 م', en: '6 m' } },
      { label: { ar: 'الارتفاع الأقصى', en: 'Max height' }, value: { ar: '5.50 م', en: '5.50 m' } },
    ],
    motors: ['acm', 'liftmaster'],
    featured: true,
    bestFor: [
      { ar: 'المستودعات والمصانع', en: 'Warehouses and factories' },
      { ar: 'الورش الصناعية', en: 'Industrial workshops' },
      {
        ar: 'مواقع وزارة الدفاع والقطاعات الحكومية',
        en: 'Ministry of Defense and government facilities',
      },
    ],
    material: {
      ar: 'سبائك ألومنيوم Unicoil سماكة 0.7 مم',
      en: '0.7 mm Unicoil aluminium alloy',
    },
    maxDimensions: { ar: 'حتى 6 م × 5.50 م', en: 'Up to 6 m × 5.50 m' },
    motorCompatibility: {
      ar: 'ACM (إيطالي) أو LiftMaster (أمريكي)',
      en: 'ACM (Italy) or LiftMaster (USA)',
    },
    commonApplications: [
      { ar: 'مستودعات صناعية', en: 'Industrial warehouses' },
      { ar: 'مواقف الشاحنات', en: 'Truck depots' },
      { ar: 'مواقع وزارة الدفاع', en: 'MoD sites' },
    ],
  },
  {
    slug: 'industrial-shutter-steel',
    name: {
      ar: 'الأبواب الشتر الصناعية (ستانلس ستيل)',
      en: 'Industrial Shutter (Stainless Steel)',
    },
    hero: '/eatmed_product_photos_png/03_industrial_shutters_stainless_steel.png',
    category: 'shutter',
    useCases: ['industrial', 'commercial', 'security'],
    tagline: {
      ar: 'شرائح ستانلس ستيل سادة أو مخرمة بسماكة 0.8 مم',
      en: 'Flat or perforated stainless-steel slats at 0.8 mm',
    },
    description: {
      ar: 'أبواب شتر للمحلات والمراكز التجارية والمستودعات. شرائح ستانلس ستيل مسطحة متشابكة بسماكة 0.8 مم (المخرمة بفتحة 2.5 مم). مجاري على شكل U من شرائح فولاذية سماكة 2 مم مجلفنة ومشكلة على البارد بمقاس 60×30 إلى 100×30 مم.',
      en: 'Shutters for shops, malls and warehouses. Interlocking flat stainless-steel slats at 0.8 mm (perforated holes 2.5 mm). Galvanised 2 mm steel guides cold-formed into 60×30 or 100×30 mm U sections.',
    },
    highlights: [
      { ar: 'شرائح ستانلس ستيل سماكة 0.8 مم', en: 'Stainless-steel slats at 0.8 mm' },
      { ar: 'تركيب موتور سنتر إيطالي أو موتور جانبي', en: 'Italian center motor or side motor' },
      { ar: 'سهولة الصيانة', en: 'Easy maintenance' },
      { ar: 'متوفرة بمقاسات تناسب مساحة الباب', en: 'Sized to fit opening' },
    ],
    motors: ['acm', 'gfa'],
    featured: false,
  },
  {
    slug: 'industrial-shutter-aluminum',
    name: {
      ar: 'الأبواب الشتر الصناعية (ألومنيوم)',
      en: 'Industrial Shutter (Aluminium)',
    },
    hero: '/eatmed_product_photos_png/04_industrial_shutters_aluminum.png',
    category: 'shutter',
    useCases: ['industrial', 'commercial'],
    tagline: {
      ar: 'شرائح ألومنيوم سماكة 1.2 مم للمساحات الواسعة',
      en: 'Aluminium slats at 1.2 mm for wider openings',
    },
    description: {
      ar: 'شرائح ألومنيوم مسطحة متشابكة سماكة 1.2 مم (المخرمة بفتحة 3.0 مم). جبهة سفلية من زوايا ألومنيوم مزدوجة 40×40×4 أو 50×50×5 مم لتقوية أسفل الشريحة.',
      en: 'Interlocking aluminium flat slats at 1.2 mm (perforated holes 3.0 mm). Double aluminium bottom angle 40×40×4 or 50×50×5 mm reinforces the curtain.',
    },
    highlights: [
      { ar: 'سماكة 1.2 مم', en: '1.2 mm slats' },
      { ar: 'جبهة سفلية مزدوجة', en: 'Double bottom angle' },
      { ar: 'مناسبة للمحلات والمستودعات', en: 'For shops and warehouses' },
    ],
    motors: ['acm', 'gfa'],
  },
  {
    slug: 'industrial-shutter-curved',
    name: { ar: 'الأبواب الشتر بشرائح منحنية', en: 'Curved-Slat Industrial Shutter' },
    hero: '/eatmed_product_photos_png/08_curved_slats.png',
    category: 'shutter',
    useCases: ['commercial', 'security'],
    tagline: {
      ar: 'شرائح منحنية فولاذية مجلفنة مطلية',
      en: 'Curved galvanised steel slats, powder coated',
    },
    description: {
      ar: 'شرائح منحنية متشابكة من فولاذ مجلفن مطلي بالزنك ومدلفن على البارد بسماكة حتى 1.2 مم (المخرمة حتى 1 مم بفتحات 2.5 أو 3.0 مم).',
      en: 'Interlocking curved slats from zinc-coated, cold-rolled galvanised steel up to 1.2 mm (perforated up to 1 mm with 2.5 or 3.0 mm holes).',
    },
    highlights: [
      { ar: 'شرائح منحنية للمظهر الجمالي', en: 'Curved profile for clean aesthetic' },
      { ar: 'طلاء بودر كوت', en: 'Powder-coated finish' },
      { ar: 'متينة ومقاومة للصدأ', en: 'Durable and corrosion resistant' },
    ],
    motors: ['acm', 'gfa'],
  },
  {
    slug: 'fire-rated-shutter-2hr',
    name: {
      ar: 'أبواب شتر مقاومة للحريق (2 ساعة)',
      en: 'Fire-Rated Shutter (2-Hour)',
    },
    hero: '/eatmed_product_photos_png/07_fire_rated_shutter_2hr.png',
    category: 'safety',
    useCases: ['industrial', 'commercial', 'security'],
    tagline: {
      ar: 'مقاومة للحريق لمدة ساعتين، شرائح فولاذية مجلفنة',
      en: '2-hour fire rating, galvanised steel curtain',
    },
    description: {
      ar: 'أبواب شتر معزولة من البولي إيثيرين أو الصوف الصخري المقاوم للحريق. مثبتة على أطراف الشرائح من الألومنيوم لضمان سهولة الحركة. تحتوي على جبهة سفلية وأقفال جانبية لزيادة الأمان.',
      en: 'Shutters insulated with polyurethane or rock wool for fire resistance. Aluminium end clips ensure smooth motion. Bottom rail and side locks for added safety.',
    },
    highlights: [
      { ar: 'مقاوم للحريق لمدة ساعتين', en: '2-hour fire resistance' },
      { ar: 'متين ومقاوم للصدأ', en: 'Durable and corrosion resistant' },
      { ar: 'متوفر بجميع الألوان', en: 'Available in all RAL colours' },
      { ar: 'مناسب لمراكز الأطفاء والورش', en: 'Ideal for fire stations and workshops' },
    ],
    specs: [
      { label: { ar: 'السماكة', en: 'Slat thickness' }, value: { ar: '0.6 - 0.8 مم', en: '0.6 – 0.8 mm' } },
      { label: { ar: 'تصنيف الحريق', en: 'Fire rating' }, value: { ar: 'ساعتان', en: '2 hours' } },
    ],
    motors: ['gfa'],
    featured: true,
    bestFor: [
      { ar: 'مراكز الإطفاء والورش', en: 'Fire stations and workshops' },
      {
        ar: 'فواصل مكافحة الحريق في المباني الكبيرة',
        en: 'Fire compartmentation in large buildings',
      },
    ],
    material: {
      ar: 'شرائح فولاذية مجلفنة معزولة بالبولي يوريثان أو الصوف الصخري',
      en: 'Galvanised steel slats insulated with polyurethane or rock wool',
    },
    fireRating: { ar: 'مقاومة للحريق لمدة ساعتين', en: '2-hour fire resistance' },
    motorCompatibility: { ar: 'GfA الألماني', en: 'GfA (Germany)' },
    commonApplications: [
      { ar: 'مراكز الإطفاء', en: 'Fire stations' },
      { ar: 'مستودعات المواد الخطرة', en: 'Hazardous material stores' },
      { ar: 'الفواصل بين أقسام المصانع', en: 'Factory compartment dividers' },
    ],
  },
  {
    slug: 'insulated-rolling-shutter',
    name: { ar: 'أبواب الرول المعزولة', en: 'Insulated Rolling Shutter' },
    hero: '/eatmed_product_photos_png/06_insulated_rolling_shutter.png',
    category: 'rolling',
    useCases: ['industrial', 'commercial'],
    tagline: {
      ar: 'شرائح بارتفاع 77/75 مم مع حشو بولي يوريثان',
      en: '77/75 mm slats with polyurethane core',
    },
    description: {
      ar: 'أبواب رول من شرائح فولاذية مجلفنة بارتفاع 77 مم (مسطحة) أو 75 مم (منحنية) مع حقن بولي يوريثان. سماكة الشريحة الخارجية 21 مم. تحتوي على شريط جانبي يجعل الباب ينزلق بسهولة وهدوء.',
      en: 'Rolling doors with 77 mm flat or 75 mm curved galvanised steel slats injected with polyurethane. Outer skin 21 mm. Side strip allows smooth, quiet operation.',
    },
    highlights: [
      { ar: 'عزل حراري وصوتي ممتاز', en: 'Excellent thermal and acoustic insulation' },
      { ar: 'سماكة شريحة خارجية 21 مم', en: '21 mm outer skin thickness' },
      { ar: 'متينة ومقاومة للصدأ', en: 'Durable and corrosion resistant' },
    ],
    motors: ['acm', 'gfa'],
  },
  {
    slug: 'automatic-grill-shutter',
    name: {
      ar: 'أبواب الشبك والقضبان المتشابكة',
      en: 'Automatic Grill Shutter',
    },
    hero: '/eatmed_product_photos_png/05_grill_shutter_doors.png',
    category: 'shutter',
    useCases: ['commercial', 'security'],
    tagline: {
      ar: 'رؤية واضحة مع أمان وديكور خارجي جمالي',
      en: 'See-through security with a striking decorative finish',
    },
    description: {
      ar: 'الأفضل لأبواب المعارض والمراكز التجارية. مصنوعة من قضبان معدنية مجلفنة ومتشابكة بسماكة 6 مم، تشكل مساحة رائعة من التصميم الخارجي. متوفرة بألوان مختلفة تناسب الديكور الداخلي.',
      en: 'Ideal for showroom and mall fronts. Galvanised interlocked metal rods at 6 mm create a beautiful exterior pattern. Available in multiple colours to match interior decor.',
    },
    highlights: [
      { ar: 'رؤية واضحة من خلال الباب', en: 'Clear visibility through the door' },
      { ar: 'مقاوم للصدأ والأحوال الجوية', en: 'Rust and weather resistant' },
      { ar: 'تشغيل أوتوماتيكي أو يدوي', en: 'Automatic or manual operation' },
    ],
    motors: ['acm'],
    featured: true,
    bestFor: [
      { ar: 'واجهات المعارض', en: 'Showroom storefronts' },
      { ar: 'محلات المراكز التجارية', en: 'Shopping mall tenants' },
    ],
    material: {
      ar: 'قضبان معدنية مجلفنة سماكة 6 مم',
      en: '6 mm galvanised metal rods',
    },
    motorCompatibility: { ar: 'ACM الإيطالي', en: 'ACM (Italy)' },
    commonApplications: [
      { ar: 'المعارض التجارية', en: 'Retail showrooms' },
      { ar: 'المراكز التجارية', en: 'Shopping malls' },
      { ar: 'المعارض الفنية', en: 'Galleries' },
    ],
  },
  {
    slug: 'window-shutter',
    name: { ar: 'ستائر النوافذ المعدنية', en: 'Window Shutter' },
    hero: '/eatmed_product_photos_png/12_metal_window_shutters.png',
    category: 'shutter',
    useCases: ['residential', 'commercial'],
    tagline: {
      ar: 'حماية، خصوصية، وعزل حراري وصوتي',
      en: 'Privacy, protection and thermal/acoustic insulation',
    },
    description: {
      ar: 'تحمي المنزل من الغبار والحشرات، تزيد الخصوصية، وتعزل الضوء والحرارة. متوفرة بنوعين من الشرائح: 4 سم و6 سم (مع شريحة معزولة)، بأربعة ألوان أساسية. جميع النوافذ بمحرك Somfy الفرنسي مع ضمان 5 سنوات.',
      en: 'Protects the home from dust and insects, increases privacy, blocks light and heat. Available in 4 cm and 6 cm (insulated) slat heights across four standard colours. All windows ship with a French Somfy motor and a 5-year warranty.',
    },
    highlights: [
      { ar: 'محرك Somfy الفرنسي', en: 'French Somfy motor' },
      { ar: 'ضمان 5 سنوات', en: '5-year warranty' },
      { ar: 'أربعة ألوان أساسية', en: 'Four standard colours' },
      { ar: 'كفاءة عزل عالية', en: 'High insulation efficiency' },
    ],
    motors: ['somfy'],
    bestFor: [
      { ar: 'الفلل والشقق السكنية', en: 'Residential villas and apartments' },
    ],
    material: {
      ar: 'شرائح ألومنيوم 4 سم أو 6 سم (معزولة)',
      en: '4 cm aluminium slats or 6 cm insulated slats',
    },
    motorCompatibility: { ar: 'Somfy الفرنسي', en: 'Somfy (France)' },
    warranty: { ar: '5 سنوات على المحرك', en: '5-year motor warranty' },
    commonApplications: [
      { ar: 'نوافذ الفلل', en: 'Villa windows' },
      { ar: 'الشقق السكنية', en: 'Residential apartments' },
    ],
  },
  {
    slug: 'overhead-sectional-panorama',
    name: { ar: 'أبواب القطع المنزلقة والبانوراما', en: 'Overhead, Sectional & Panorama Doors' },
    hero: '/eatmed_product_photos_png/11_overhead_sectional_doors.png',
    category: 'rolling',
    useCases: ['residential', 'commercial', 'industrial'],
    tagline: {
      ar: 'ألواح طولية تنزلق على مسارات السقف والأرض',
      en: 'Longitudinal panels gliding on ceiling and floor tracks',
    },
    description: {
      ar: 'أبواب الكراجات الأمريكية والقطع المنزلقة بسماكة 5 سم. متوفرة بإطارات بانوراما ألومنيوم تجارية مع زجاج اختياري للمظهر العصري — مثالية لمحطات الوقود ومراكز الخدمة الذاتية ومراكز الإطفاء.',
      en: 'American-style sectional garage doors at 5 cm thickness. Optional commercial aluminium panorama frames with glazed panels deliver a modern look — perfect for service stations, fire stations and self-service centres.',
    },
    highlights: [
      { ar: 'إطارات ألومنيوم تجارية', en: 'Commercial aluminium frames' },
      { ar: 'زجاج بانوراما اختياري', en: 'Optional panorama glazing' },
      { ar: 'سماكة 5 سم', en: '5 cm panel thickness' },
    ],
    motors: ['liftmaster'],
    featured: true,
    bestFor: [
      { ar: 'محطات الوقود', en: 'Service stations' },
      { ar: 'مراكز الإطفاء', en: 'Fire stations' },
      { ar: 'مراكز خدمة السيارات', en: 'Self-service auto centres' },
    ],
    material: { ar: 'ألواح ألومنيوم سماكة 5 سم', en: '5 cm aluminium panels' },
    motorCompatibility: { ar: 'LiftMaster الأمريكي', en: 'LiftMaster (USA)' },
    commonApplications: [
      { ar: 'محطات الوقود', en: 'Petrol stations' },
      { ar: 'مراكز الإطفاء', en: 'Fire stations' },
      { ar: 'الكراجات السكنية الفاخرة', en: 'Premium residential garages' },
    ],
  },
  {
    slug: 'polycarbonate-doors',
    name: { ar: 'أبواب البولي كربونات', en: 'Polycarbonate Doors' },
    hero: '/eatmed_product_photos_png/10_polycarbonate_doors.png',
    category: 'rolling',
    useCases: ['commercial'],
    tagline: {
      ar: 'شفافة ومعزولة، مثالية للمحلات والكافيهات',
      en: 'Transparent insulated panels — ideal for shops & cafés',
    },
    description: {
      ar: 'أبواب بولي كربونات شفافة ومعزولة من البلاستيك المقوى بالألياف الزجاجية بسماكة 6-8 مم. تتيح عرض المنتجات حتى عند إغلاق المحل. شريحة النهاية من ألومنيوم ممزوج بالكاوتشوك لتحمل الضغط أثناء الإغلاق.',
      en: 'Transparent insulated polycarbonate doors from fibreglass-reinforced plastic at 6–8 mm. Display products even after closing hours. Rubber-mixed aluminium end strip absorbs closing pressure.',
    },
    highlights: [
      { ar: 'يسمح بعرض المنتجات بعد الإغلاق', en: 'Showcases products after hours' },
      { ar: 'متين وسهل الاستخدام', en: 'Durable and easy to operate' },
      { ar: 'قابل للطلاء بأي لون', en: 'Custom paintable in any colour' },
    ],
    motors: ['acm'],
  },
  {
    slug: 'sliding-gates',
    name: { ar: 'البوابات المنزلقة (سلايدينج)', en: 'Sliding Gates' },
    hero: '/eatmed_product_photos_png/09_sliding_gates.png',
    category: 'gate',
    useCases: ['commercial', 'industrial', 'security'],
    tagline: {
      ar: 'محركات CAME الإيطالية لبوابات حتى 3500 كجم',
      en: 'Italian CAME motors for gates up to 3,500 kg',
    },
    description: {
      ar: 'أجهزة سلايدينج جانبية من شركة CAME الإيطالية، تتميز بقدرة هائلة على تحمل الضغط والاستخدام. موديل BY-3500T يدعم بوابات حتى 3500 كجم. موديلات 801MS تغطي من 800 إلى 2200 كجم.',
      en: 'Italian CAME side-sliding actuators with exceptional pressure and duty cycle. BY-3500T model handles gates up to 3,500 kg. 801MS range covers 800 – 2,200 kg.',
    },
    highlights: [
      { ar: 'محركات CAME الإيطالية', en: 'Italian CAME motors' },
      { ar: 'تحمل حتى 3500 كجم', en: 'Up to 3,500 kg capacity' },
      { ar: 'تصنيف حماية IP44 - IP54', en: 'IP44 – IP54 protection rating' },
    ],
    motors: ['came'],
  },
  {
    slug: 'swing-gates',
    name: { ar: 'بوابات الدرفتين (ماتور الكافرات)', en: 'Swing Gates' },
    hero: '/eatmed_product_photos_png/16_swing_gates_motor.png',
    category: 'gate',
    useCases: ['residential', 'commercial'],
    tagline: {
      ar: 'محركات R50 و Nice WINGO عالية السرعة',
      en: 'R50 wheel motors and Nice WINGO high-speed actuators',
    },
    description: {
      ar: 'محرك بوابة السحب R50 محرك كهروميكانيكي قوي مصمم لبوابات السحب في المنازل والمنشآت التجارية الخفيفة. محرك WINGO Hi-Speed من Nice يجمع التقنية المتقدمة مع سهولة البرمجة لبوابات سريعة وآمنة.',
      en: 'R50 swing gate motor — a durable electromechanical actuator for residential and light-commercial swing gates. Nice WINGO Hi-Speed motor combines advanced tech with easy programming for fast, secure gate movement.',
    },
    highlights: [
      { ar: 'تشغيل سلس وهادئ', en: 'Smooth and quiet operation' },
      { ar: 'تركيب سهل وأداء طويل الأمد', en: 'Easy installation, long-term performance' },
      { ar: 'مناسب للسكني والتجاري الخفيف', en: 'Residential and light commercial' },
    ],
    motors: ['nice', 'came'],
  },
  {
    slug: 'glass-doors',
    name: { ar: 'الأبواب الزجاجية ذات الدرفتين', en: 'Automatic Glass Doors' },
    hero: '/eatmed_product_photos_png/15_double_leaf_glass_doors.png',
    category: 'glass',
    useCases: ['commercial'],
    tagline: {
      ar: 'محركات Dormakaba ESA200 للمداخل الواسعة',
      en: 'Dormakaba ESA200 operators for wide entrances',
    },
    description: {
      ar: 'باب Dormakaba مصنوع من الألومنيوم الموثوق بتصميم يعتمد على الإطارات الرأسية والأفقية، ومخصص للاستخدامات الداخلية والخارجية. يوفر بخيارات إطارات ضيقة أو متوسطة، ويتوافق مع مجموعة متنوعة من أنواع الزجاج ذات الأداء العالي.',
      en: 'The Dormakaba is an extruded aluminium stile-and-rail door designed for interior and exterior applications. Available in narrow or medium stiles and compatible with a wide range of performance glass options.',
    },
    highlights: [
      { ar: 'محرك Dormakaba ESA200', en: 'Dormakaba ESA200 operator' },
      { ar: 'إطارات ضيقة أو متوسطة', en: 'Narrow or medium stile profiles' },
      { ar: 'مستشعرات حركة وحضور مزدوجة', en: 'Dual motion/presence sensors' },
      { ar: 'قفل أمان متطور بنقطتين', en: 'Maximum-security two-point mortise lock' },
    ],
    motors: ['dormakaba'],
    featured: true,
    bestFor: [
      { ar: 'مداخل المباني الرئيسية', en: 'Main building entrances' },
      { ar: 'الفنادق والمستشفيات', en: 'Hotels and hospitals' },
      { ar: 'المداخل ذات الحركة الكثيفة', en: 'High-traffic entrances' },
    ],
    material: {
      ar: 'ألومنيوم مبثوق مع زجاج عالي الأداء',
      en: 'Extruded aluminium with performance glass',
    },
    motorCompatibility: { ar: 'Dormakaba ESA200', en: 'Dormakaba ESA200' },
    commonApplications: [
      { ar: 'الفنادق', en: 'Hotels' },
      { ar: 'المستشفيات', en: 'Hospitals' },
      { ar: 'المراكز التجارية', en: 'Shopping malls' },
      { ar: 'مباني المكاتب الرئيسية', en: 'Office building lobbies' },
    ],
  },
  {
    slug: 'emergency-fire-doors',
    name: { ar: 'أبواب الطوارئ (عادية وضد الحريق)', en: 'Emergency & Fire-Rated Doors' },
    hero: '/eatmed_product_photos_png/14_hollow_metal_doors.png',
    category: 'safety',
    useCases: ['industrial', 'commercial', 'security'],
    tagline: {
      ar: 'الخيار الأفضل لمخارج الطوارئ ودورات المياه وغرف الأشعة',
      en: 'Best choice for fire exits, washrooms and radiology rooms',
    },
    description: {
      ar: 'أبواب طوارئ جوفاء مقاومة للحريق، أو جوفاء معزولة للصوت والحرارة بمادة البولي يوريثان، أو مروحية معزولة بفعالية وعملية.',
      en: 'Hollow-metal fire-rated doors, polyurethane-insulated hollow-metal doors for sound and heat, and double-action insulated swing doors for high-traffic areas.',
    },
    highlights: [
      { ar: 'مقاومة للحريق', en: 'Fire-rated' },
      { ar: 'عزل صوتي وحراري', en: 'Sound and heat insulation' },
      { ar: 'مناسبة لمخارج الطوارئ', en: 'Suitable for emergency exits' },
    ],
    bestFor: [
      { ar: 'مخارج الطوارئ', en: 'Emergency exits' },
      { ar: 'غرف الأشعة والمختبرات', en: 'Radiology rooms and labs' },
      { ar: 'دورات المياه', en: 'Washrooms' },
    ],
    material: {
      ar: 'فولاذ جوفاء معزول بالبولي يوريثان',
      en: 'Hollow metal insulated with polyurethane',
    },
    fireRating: { ar: 'متوفرة بتصنيف مقاوم للحريق', en: 'Available fire-rated' },
    commonApplications: [
      { ar: 'مخارج الطوارئ', en: 'Emergency exits' },
      { ar: 'المستشفيات', en: 'Hospitals' },
      { ar: 'المختبرات', en: 'Laboratories' },
    ],
  },
  {
    slug: 'parking-barriers',
    name: { ar: 'الأعمدة الإلكترونية لمواقف السيارات', en: 'Electronic Parking Barriers' },
    hero: '/eatmed_product_photos_png/13_electronic_parking_barriers.png',
    category: 'barrier',
    useCases: ['commercial', 'security'],
    tagline: {
      ar: 'حواجز إيطالية بأطوال من 3 إلى 8 أمتار',
      en: 'Italian-made barriers from 3 m to 8 m boom length',
    },
    description: {
      ar: 'الأعمدة الإلكترونية لمواقف السيارات تمنع دخول وخروج السيارات إلا عن طريق حساسات أرضية أو ريموت أو بطاقة دخول. صناعة إيطالية بقدرة تشغيل وتحمل عالية. متوفرة بمقاسات 3 - 4 - 5 - 6 - 7 - 8 متر.',
      en: 'Electronic parking barriers gate vehicle traffic via ground sensors, remotes or access cards. Italian-made with high operational capacity. Available in 3, 4, 5, 6, 7 and 8 m boom lengths.',
    },
    highlights: [
      { ar: 'صناعة إيطالية', en: 'Italian manufacture' },
      { ar: 'يدعم بطاقات الدخول والريموت', en: 'Supports cards and remotes' },
      { ar: 'حساس أرضي للمخرج', en: 'Ground sensor for exit lane' },
    ],
    motors: ['came'],
  },
];

export const getProductBySlug = (slug: string) =>
  products.find((p) => p.slug === slug);

export const featuredProducts = products.filter((p) => p.featured);
