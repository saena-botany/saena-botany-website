import { FormEvent, TouchEvent, useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Droplets,
  Flower2,
  GraduationCap,
  Leaf,
  Menu,
  MessageCircle,
  Mountain,
  Phone,
  Sprout,
  TreePine,
  Users,
  X,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';

type Route = 'home' | 'about' | 'training' | 'services' | 'projects' | 'products' | 'contact';
type EnquiryType = 'training' | 'landscaping' | 'general';

const images = {
  hero: 'https://images.pexels.com/photos/12916212/pexels-photo-12916212.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  greenhouse: 'https://images.pexels.com/photos/7299957/pexels-photo-7299957.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  learners: 'https://images.pexels.com/photos/6511177/pexels-photo-6511177.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  landscape: 'https://images.pexels.com/photos/37720375/pexels-photo-37720375.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  tea: 'https://images.pexels.com/photos/5987947/pexels-photo-5987947.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  whoWeAre: '/Turfarea.jpg',
  whoWeAreFallback: '/assets/images/demo-gardens.jpeg',
  nursery: '/assets/images/Spekboom_crop.jpg',
  demonstrationGardens: '/assets/images/demo-gardens.jpeg',
  greenhouseFacility: '/assets/images/greenhouses.jpeg',
  ecoLoo: '/assets/images/eco-loo.jpeg',
};

const navItems = [
  { label: 'Home', route: 'home' as Route },
  { label: 'About Us', route: 'about' as Route },
  { label: 'Training & Skills', route: 'training' as Route, dropdown: ['Qualifications', 'Our approach', 'Workplace learning', 'Entry requirements'] },
  { label: 'Services', route: 'services' as Route, dropdown: ['Design & planning', 'Installation', 'Maintenance', 'Irrigation'] },
  { label: 'Projects', route: 'projects' as Route },
  { label: 'Products', route: 'products' as Route, dropdown: ['Greenhouse plants', 'Botanical products', 'Spekboom teas'] },
  { label: 'Contact', route: 'contact' as Route },
];

const qualifications = [
  { level: 'NQF Level 1', title: 'National Certificate: Mixed Farming Systems', id: 'SAQA ID 48971' },
  { level: 'NQF Level 1', title: 'National Certificate: Plant Production', id: 'SAQA ID 48972' },
  { level: 'NQF Level 2', title: 'National Certificate: Plant Production', id: 'SAQA ID 48975' },
];

const learningPaths = [
  { number: '01', title: 'Learnerships', text: 'Structured agricultural and horticultural learning programmes that combine theoretical training, practical experience and workplace exposure. These programmes provide learners with an opportunity to develop occupational skills and work towards recognised qualifications.' },
  { number: '02', title: 'Short Skills Programmes', text: 'Focused, credit-bearing training programmes designed to develop specific agricultural and horticultural competencies. Delivered through practical, facilitator-led learning and tailored to employer and project requirements.' },
  { number: '03', title: 'Work-Integrated Learning (WIL)', text: 'Practical workplace experience for students studying agriculture, horticulture and related disciplines. Learners gain exposure to real working environments through placements at Saena facilities and external partner organisations.' },
  { number: '04', title: 'Agro-processing Workshops', text: 'Practical workshops introducing participants to agricultural value addition, product development and processing opportunities. Designed to build practical knowledge and encourage agricultural entrepreneurship.' },
  { number: '05', title: 'ANAMED Seminars', text: 'Educational seminars exploring medicinal plants, their cultivation, traditional uses and natural product preparation. Delivered in alignment with the relevant ANAMED training arrangements.' },
];

const facilitySlides = [
  { title: 'Nursery facilities', image: images.nursery, alt: 'Nursery plants arranged in growing beds' },
  { title: 'Demonstration gardens', image: images.demonstrationGardens, alt: 'A landscaped demonstration garden with flowering plants' },
  { title: 'Greenhouse facilities', image: images.greenhouseFacility, alt: 'Greenhouse structures at Saena Botany' },
  { title: 'Eco loo', image: images.ecoLoo, alt: 'Eco loo facilities at Saena Botany' },
];

const approachStages = [
  { number: '01', title: 'Learn', label: 'Skills Development & Capacity Building', text: 'Acquire relevant knowledge and practical skills through structured learning and training opportunities.' },
  { number: '02', title: 'Apply', label: 'Practical Learning & Demonstration', text: 'Put knowledge into practice through hands-on experience, workplace exposure and demonstration activities.' },
  { number: '03', title: 'Restore', label: 'Environmental Action', text: 'Contribute to environmental improvement through restoration, greening, biodiversity and sustainable community initiatives.' },
  { number: '04', title: 'Empower', label: 'Youth Economic Participation', text: 'Create pathways for young people to access employment, develop enterprises and participate in the green economy.' },
  { number: '05', title: 'Sustain', label: 'Partnerships & Long-term Impact', text: 'Build lasting impact through collaboration, community participation and sustainable partnerships.' },
];

const featuredProjects = [
  { title: '67 Spekboom in 67 Minutes', category: 'Environmental Action / Community Greening', description: "In recognition of Nelson Mandela's legacy and spirit of community service, Saena Botany brought together volunteers from different organisations to plant 67 Spekboom plants in just 67 minutes. The initiative encouraged collective environmental action and demonstrated how communities can work together to make a positive environmental contribution.", image: '/assets/facilities/IMG-20250718-WA0050.jpg', alt: 'Hands planting Spekboom seedlings in soil' },
  { title: 'Little Falls Pleasure Resort', category: 'Environmental Enhancement / Landscape Transformation', description: 'Saena Botany contributed to the transformation of an underutilised space at Little Falls Pleasure Resort into a more attractive and inviting environment. The project incorporated Spekboom planting and a winter garden, helping to revitalise the space and improve its overall appearance.' },
  { title: 'Melpark Primary School', category: 'School Greening / Environmental Education', description: 'At Melpark Primary School, Saena Botany transformed a bare outdoor space into an attractive garden environment. The project incorporated Spekboom and distinctive plant species such as Strelitzia. Learners were actively involved in planting activities and learning about plant care and environmental stewardship.' },
];

const services = [
  { icon: Flower2, title: 'Garden design & planning', text: 'Thoughtful garden plans shaped around your space, lifestyle and planting vision.' },
  { icon: Sprout, title: 'Garden installation', text: 'From preparation to planting, we develop gardens with care and purpose.' },
  { icon: TreePine, title: 'Garden maintenance', text: 'Regular, reliable care that keeps established gardens healthy and inviting.' },
  { icon: Leaf, title: 'Planting & establishment', text: 'Plant selection and establishment for gardens that grow with confidence.' },
  { icon: Mountain, title: 'Lawn establishment', text: 'Lawn preparation, establishment and ongoing maintenance for usable green spaces.' },
  { icon: Droplets, title: 'Irrigation', text: 'Installation and maintenance of practical irrigation systems for healthier landscapes.' },
];

const products = [
  { name: 'Lemongrass Tea Bags 20s', price: 'R80', image: images.tea, note: 'From our greenhouse' },
  { name: 'Hibiscus Tea Bags 20s', price: 'R120', image: images.tea, note: 'From our greenhouse' },
  { name: 'Cancer Bush Tea Bags 20s', price: 'R100', image: images.tea, note: 'From our greenhouse' },
  { name: 'Tulsi Tea Bags 20s', price: 'R140', image: images.tea, note: 'From our greenhouse' },
  { name: 'Lemongrass Loose Leaves 100g', price: 'R50', image: images.greenhouse, note: 'Dried botanical product' },
  { name: 'Hibiscus Loose Leaves 100g', price: 'R90', image: images.greenhouse, note: 'Dried botanical product' },
];

function pathToRoute(): Route {
  const path = window.location.hash.replace(/^#\/?/, '').split('/')[0];
  return (['home', 'about', 'training', 'services', 'projects', 'products', 'contact'] as Route[]).includes(path as Route)
    ? path as Route
    : 'home';
}

function App() {
  const [route, setRoute] = useState<Route>(pathToRoute);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(pathToRoute());
      setMobileOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', onHashChange);
    if (!window.location.hash) window.history.replaceState(null, '', '#/home');
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    const titles: Record<Route, string> = {
      home: 'Saena Botany | Training, Skills Development & Landscaping',
      about: 'About Saena Botany | Agricultural Skills Development',
      training: 'Training & Skills Development | Saena Botany',
      services: 'Landscaping Services | Saena Botany',
      projects: 'Projects | Saena Botany',
      products: 'Botanical Products | Saena Botany',
      contact: 'Contact Saena Botany | Training & Enquiries',
    };
    document.title = titles[route];
  }, [route]);

  return (
    <div className="site-shell">
      <AnnouncementBar />
      <Header route={route} mobileOpen={mobileOpen} onToggleMobile={() => setMobileOpen((open) => !open)} />
      <main>
        {route === 'home' && <HomePage />}
        {route === 'about' && <AboutPage />}
        {route === 'training' && <TrainingPage />}
        {route === 'services' && <ServicesPage />}
        {route === 'projects' && <ProjectsPage />}
        {route === 'products' && <ProductsPage />}
        {route === 'contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
}

function AnnouncementBar() {
  return (
    <div className="announcement">
      <div className="container announcement-inner">
        <span><span className="announcement-dot" /> AgriSETA-accredited training provider</span>
        <a href="tel:+27746301432">074 630 1432 <ArrowUpRight size={14} /></a>
      </div>
    </div>
  );
}

function Header({ route, mobileOpen, onToggleMobile }: { route: Route; mobileOpen: boolean; onToggleMobile: () => void }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#/home" className="brand" aria-label="Saena Botany home">
          <img src="/SB_-Final_Logo_1.png" alt="Saena Botany" />
        </a>
        <button className="mobile-menu-button" onClick={onToggleMobile} aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav className={`main-nav ${mobileOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          {navItems.map((item) => (
            <div className={`nav-item ${item.dropdown ? 'has-dropdown' : ''}`} key={item.route}>
              <a href={`#/${item.route}`} className={route === item.route ? 'active' : ''}>
                {item.label}
                {item.dropdown && <ChevronDown size={14} />}
              </a>
              {item.dropdown && (
                <div className="dropdown-menu">
                  {item.dropdown.map((label) => <a href={`#/${item.route}`} key={label}>{label}</a>)}
                </div>
              )}
            </div>
          ))}
          <a href="#/contact" className="nav-cta">Make an enquiry <ArrowUpRight size={15} /></a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img src="/SB_-Final_Logo_1.png" alt="Saena Botany" />
          <p>Creating a path through practical agricultural learning, sustainable growing and thoughtful landscapes.</p>
        </div>
        <div><p className="footer-label">Explore</p><a href="#/training">Training & Skills</a><a href="#/services">Landscaping Services</a><a href="#/projects">Projects</a><a href="#/products">Products</a></div>
        <div><p className="footer-label">Contact</p><a href="tel:+27746301432">074 630 1432</a><a href="mailto:projects@saenabotany.co.za">projects@saenabotany.co.za</a><a href="#/contact">Send an enquiry</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} Saena Botany (Pty) Ltd</span><span>Training • Growth • Opportunity</span></div>
    </footer>
  );
}

function PageIntro({ eyebrow, title, text, image }: { eyebrow: string; title: string; text: string; image: string }) {
  return <section className="page-intro"><div className="container page-intro-grid"><div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="intro-text">{text}</p></div><img src={image} alt="" /></div></section>;
}

function Button({ href, children, variant = 'primary' }: { href: string; children: React.ReactNode; variant?: 'primary' | 'light' | 'outline' }) {
  return <a className={`button button-${variant}`} href={href}>{children}<ArrowRight size={17} /></a>;
}

function SectionHeading({ eyebrow, title, text, align = 'left' }: { eyebrow: string; title: string; text?: string; align?: 'left' | 'center' }) {
  return <div className={`section-heading ${align === 'center' ? 'centered' : ''}`}><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}

function StatStrip() {
  return <div className="stat-strip"><div><strong>7 Qualifications</strong><span>Currently offered across Saena’s accredited training scope.</span></div><div><strong>NQF Levels 1–3</strong><span>Horticulture and related learning pathways.</span></div><div><strong>AgriSETA Workplace Approved</strong><span>Practical workplace learning and training environment.</span></div></div>;
}

function HomePage() {
  return <>
    <section className="hero"><div className="hero-image" style={{ backgroundImage: `url(${images.hero})` }} /><div className="container hero-content"><div className="hero-copy"><p className="eyebrow light-eyebrow">Training • Growth • Opportunity</p><h1>Growing People.<br /><em>Greening Communities.</em><br />Sustaining the Future.</h1><p>An environmental and horticultural social enterprise empowering young people through skills development, practical learning and environmental action.</p><div className="hero-actions"><Button href="#/training" variant="light">Explore training</Button><Button href="#/about" variant="outline">Discover Saena Botany</Button></div></div><div className="hero-note"><span>01</span><p>Learning grounded in the land, designed for real opportunity.</p></div></div></section>
    <div className="container"><StatStrip /></div>
    <section className="section section-paper"><div className="container split-grid intro-split"><div className="image-frame tall"><img src={images.whoWeAre} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = images.whoWeAreFallback; }} alt="Saena Botany demonstration garden" /><span className="image-caption">Practical learning, every step of the way</span></div><div><p className="eyebrow">Who we are</p><h2>Where learning takes root.</h2><p className="lead">Saena Botany is a South African youth-focused environmental and horticultural social enterprise dedicated to growing people, restoring environments and building sustainable communities. Through accredited training, practical learning, environmental initiatives and strategic partnerships, Saena creates pathways for youth empowerment while advancing biodiversity conservation, climate resilience and sustainable livelihoods.</p><Button href="#/about">Meet Saena Botany</Button></div></div></section>
    <TrainingPreview />
    <FacilitiesSection />
    <ApproachSection />
    <ProjectsPreview />
    <ProductsPreview />
    <WhyChoose />
    <FaqSection />
    <ContactCta />
  </>;
}

function TrainingPreview() {
  return <section className="section section-dark"><div className="container"><div className="section-heading split-heading"><div><p className="eyebrow light-eyebrow">Training & Skills Development</p><h2>Build a future with practical skills.</h2></div><p>Learning pathways that combine structured theory, practical experience and workplace exposure.</p></div><div className="qualification-grid training-path-grid">{learningPaths.map((path) => <div className="qualification-card learning-path-card" key={path.number}><span>{path.number}</span><h3>{path.title}</h3><p>{path.text}</p></div>)}</div><div className="section-action"><Button href="#/training" variant="light">View all training information</Button></div></div></section>;
}

function FacilitiesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const facilities = [{ title: 'Greenhouses', icon: Sprout, text: 'Protected growing environments where learners can observe plant production, practise growing techniques and build confidence in a structured agricultural setting.' }, { title: 'Eco bathrooms', icon: Leaf, text: 'Environmentally aware facilities that help learners connect everyday infrastructure with responsible resource use and practical sustainability.' }, { title: 'Demonstration spaces', icon: GraduationCap, text: 'Purposeful spaces where agricultural methods, environmental care and practical skills can be seen, discussed and applied.' }, { title: 'Nurseries', icon: TreePine, text: 'Living learning spaces for propagation, plant care and growth, supporting the observation and repetition that practical skills require.' }];
  const moveCarousel = (direction: number) => setActiveIndex((current) => (current + direction + facilitySlides.length) % facilitySlides.length);
  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartX;
    setTouchStartX(null);
    if (start === null) return;
    const distance = event.changedTouches[0].clientX - start;
    if (Math.abs(distance) > 40) moveCarousel(distance > 0 ? -1 : 1);
  };
  const activeSlide = facilitySlides[activeIndex];

  return <section className="section"><div className="container"><SectionHeading eyebrow="Our facilities" title="Learning environments with life in them." text="Our facilities bring practical agricultural learning to life, giving learners space to observe, practise and build confidence." /><div className="facility-layout"><div className="facility-image facility-carousel" onTouchStart={(event) => setTouchStartX(event.changedTouches[0].clientX)} onTouchEnd={handleTouchEnd}><img key={activeSlide.title} src={activeSlide.image} alt={activeSlide.alt} aria-live="polite" /><button className="carousel-button carousel-prev" type="button" aria-label="Previous facility image" onClick={() => moveCarousel(-1)}><ChevronLeft size={20} /></button><button className="carousel-button carousel-next" type="button" aria-label="Next facility image" onClick={() => moveCarousel(1)}><ChevronRight size={20} /></button><div className="image-badge">Practical by design</div><div className="carousel-dots" aria-label="Facility images">{facilitySlides.map((slide, index) => <button className={index === activeIndex ? 'active' : ''} type="button" key={slide.title} aria-label={`Show ${slide.title}`} aria-current={index === activeIndex} onClick={() => setActiveIndex(index)} />)}</div></div><div className="facility-list">{facilities.map(({ title, icon: Icon, text }) => <div className="facility-item" key={title}><div className="icon-box"><Icon size={22} /></div><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></div></section>;
}

function ApproachSection() {
  return <section className="section section-sage"><div className="container"><div className="section-heading approach-heading"><p className="eyebrow">Our approach</p><h2>Growing People. Greening Communities. Sustaining the Future.</h2><p className="lead">Saena Botany follows an integrated, community-driven approach that combines skills development, practical experience, environmental stewardship and economic empowerment.</p><p>We believe that meaningful environmental transformation begins with investing in people. Through learning, practical application and environmental action, we create opportunities for young people to develop skills, contribute to their communities and participate in the green economy.</p></div><div className="approach-stages">{approachStages.map((stage) => <div className="approach-stage" key={stage.number}><span>{stage.number}</span><h3>{stage.title}</h3><strong>{stage.label}</strong><p>{stage.text}</p></div>)}</div><div className="section-action"><Button href="#/about">Discover Our Approach</Button></div></div></section>;
}

function ProjectsPreview() {
  return <section className="section"><div className="container"><SectionHeading eyebrow="Featured projects" title="Growing change through shared action." text="Three examples of Saena Botany’s environmental, educational and community-focused work." /><div className="project-grid home-project-grid"><HomeProjectCard large project={featuredProjects[0]} /><HomeProjectCard project={featuredProjects[1]} /><HomeProjectCard project={featuredProjects[2]} /></div><div className="center-action"><Button href="#/projects" variant="outline">View project portfolio</Button></div></div></section>;
}

function HomeProjectCard({ project, large = false }: { project: typeof featuredProjects[number]; large?: boolean }) {
  return <a href="#/projects" className={`project-card home-project-card ${large ? 'large' : ''} ${project.image ? '' : 'is-placeholder'}`}>{project.image ? <img src={project.image} alt={project.alt} /> : <div className="project-placeholder"><span>Project photography coming soon</span></div>}<div className="project-overlay"><span>{project.category}</span><h3>{project.title}</h3><p>{project.description}</p><ArrowUpRight size={20} /></div></a>;
}

function ProjectCard({ title, image, large = false }: { title: string; image: string; large?: boolean }) {
  return <a href="#/projects" className={`project-card ${large ? 'large' : ''}`}><img src={image} alt="Temporary project placeholder" /><div className="project-overlay"><span>Placeholder showcase</span><h3>{title}</h3><ArrowUpRight size={20} /></div></a>;
}

function ProductsPreview() {
  return <section className="section section-sage"><div className="container"><div className="split-heading section-heading"><div><p className="eyebrow">Our products</p><h2>Grown with care, prepared with purpose.</h2></div><div><p>Explore a growing selection of greenhouse plants, botanical products and Spekboom teas.</p><Button href="#/products">Browse products</Button></div></div><div className="product-grid">{products.slice(0, 3).map((product) => <ProductCard product={product} key={product.name} />)}</div></div></section>;
}

function ProductCard({ product }: { product: typeof products[number] }) {
  return <div className="product-card"><div className="product-image"><img src={product.image} alt={product.name} /><span>{product.note}</span></div><div className="product-card-content"><div><h3>{product.name}</h3><p>Public price</p></div><strong>{product.price}</strong></div></div>;
}

function WhyChoose() {
  const reasons = [{ icon: GraduationCap, title: 'AgriSETA Accredited', text: 'Saena Botany is an AgriSETA-accredited training provider delivering agricultural learning aligned with recognised qualifications.' }, { icon: Users, title: 'AgriSETA Workplace Approved', text: 'Our approved workplace environment supports practical learning, structured experience and workplace-based training at Saena Botany’s facilities.' }, { icon: Sprout, title: '8+ Years of Experience', text: 'More than eight years of experience in training, practical skills development and environmental initiatives.' }];
  return <section className="section section-dark"><div className="container"><SectionHeading eyebrow="Why choose Saena Botany" title="A credible place to begin." text="We believe opportunity grows when knowledge, practice and purpose come together." align="center" /><div className="reason-grid">{reasons.map(({ icon: Icon, title, text }) => <div key={title}><Icon size={28} /><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>;
}

function FaqSection() {
  const [open, setOpen] = useState(0);
  const faqs = [
    ['What is the minimum educational requirement?', 'The minimum educational requirement for the agricultural training programmes is Grade 9.'],
    ['Who are the programmes for?', 'Programmes are designed for school leavers, unemployed youth, aspiring farmers, agricultural entrepreneurs, existing agricultural workers and people interested in plant production and sustainable farming.'],
    ['Where does practical learning take place?', 'Work Integrated Learning takes place at Saena Botany’s own agricultural facilities and at external workplaces where required.'],
    ['How do I make a training enquiry?', 'Use the enquiry form on the Contact page or call or WhatsApp 074 630 1432.'],
  ];
  return <section className="section section-paper"><div className="container faq-layout"><div><p className="eyebrow">Frequently asked questions</p><h2>Good questions make a strong start.</h2><p>Find a few helpful answers below, or speak to us directly about your path.</p><Button href="#/contact">Ask a question</Button></div><div className="faq-list">{faqs.map(([question, answer], index) => <div className={`faq-item ${open === index ? 'open' : ''}`} key={question}><button onClick={() => setOpen(open === index ? -1 : index)} aria-expanded={open === index}><span>{question}</span><ChevronDown size={19} /></button>{open === index && <p>{answer}</p>}</div>)}</div></div></section>;
}

function ContactCta() {
  return <section className="contact-cta"><div className="container contact-cta-inner"><div><p className="eyebrow light-eyebrow">Start a conversation</p><h2>Ready to create your path?</h2><p>Whether you are exploring training, landscaping or our botanical products, we would like to hear from you.</p></div><div className="hero-actions"><Button href="#/contact" variant="light">Make an enquiry</Button><a className="text-link light-link" href="https://wa.me/27746301432" target="_blank" rel="noreferrer"><MessageCircle size={18} /> WhatsApp us</a></div></div></section>;
}

function AboutPage() {
  return <><PageIntro eyebrow="About Saena Botany" title="Growing people, places and possibility." text="A South African organisation bringing practical agricultural learning and purposeful landscaping together." image={images.hero} /><section className="section"><div className="container narrow-copy"><p className="eyebrow">Our background</p><h2>Youth owned , Led by Veterans...</h2><p className="lead">Saena Botany exists to create a path for people who want to learn, work and grow through horticulture.</p><p>Founded on the belief that skills development and environmental stewardship can become powerful drivers of socio-economic transformation . Saena Botany integrates horticulture,environmental conservation,sustainable agriculture and enterprise development to address the growing need for a skilled , environmentally conscious and economically active generation.</p></div></section><section className="section section-sage"><div className="container values-grid"><div><p className="eyebrow">Our commitement</p><h2>We recognise that environmental sustainability cannot be achieved without investing in people.</h2><p>Saena Botany seeks to create sustainable livelihoods,restore natural environments and cultivate environmentally conscious communities.</p></div><div><p className="eyebrow">Our vision</p><h2>To be a leading catalyst for environmental transformation and sustainable community development.</h2><p>We see horticulture as a pathway to opportunity, enterprise and sustainable communities.</p></div></div></section><section className="section"><div className="container split-grid approach-grid"><div className="image-frame"><img src={images.learners} alt="People working with plants in a greenhouse" /></div><div><p className="eyebrow">Our Leadership & Experience</p><h2>Grounded in more than two decades of experience in the horticulture and green industry.</h2><p>The organisation founder and projects manager boast  22 years of industry experience and qualifications in ornamental horticulture and the broader green industry. She brings extensive experience in horticultural training,skill development,industry engagement and youth empowerment.
</p><ul>Recipient of the 2019 SouthAfrican Green Industry Council (SAGIC) Certificate of Excellence in Training.   
2024 Earthizens Youth Development and Indigenous Herbs Cultivation category nominee.
A track record of contributing to the development and employment of approximately 80 young people in the green industry
</ul> </div></div></section><ContactCta /></>;
}

function TrainingPage() {
  return <><PageIntro eyebrow="Training & Skills Development" title="Learn the work behind a thriving agricultural future." text="Accredited qualifications, practical facilities and workplace learning for people ready to grow their skills." image={images.learners} /><section className="section"><div className="container split-grid training-overview"><div><p className="eyebrow">A practical foundation</p><h2>Classroom knowledge, hands-on confidence.</h2><p className="lead">Training combines classroom-based theoretical instruction with hands-on practical training.</p><p>Our programmes are designed to connect what learners understand with what they can do, creating a stronger foundation for agricultural work, enterprise and further development.</p></div><div className="accreditation-card"><div className="accreditation-mark"><Check size={20} /></div><p className="eyebrow">Accredited provider</p><h3>AgriSETA-accredited training provider</h3><p>Provider number: <strong>661739743</strong></p><p>Workplace approval by AgriSETA applies to the agricultural training programmes offered.</p></div></div></section><section className="section section-dark" id="qualifications"><div className="container"><SectionHeading eyebrow="Qualifications" title="Three confirmed learning pathways." text="Explore the agricultural qualifications currently included in the Saena Botany training offering." /><div className="qualification-grid">{qualifications.map((qualification) => <div className="qualification-card" key={qualification.id}><span>{qualification.level}</span><h3>{qualification.title}</h3><p>{qualification.id}</p><a href="#/contact">Enquire about this programme <ArrowUpRight size={16} /></a></div>)}</div></div></section><section className="section section-paper"><div className="container split-grid approach-grid"><div><p className="eyebrow">Work Integrated Learning</p><h2>Learning that moves into the workplace.</h2><p>WIL takes place at Saena Botany’s own agricultural facilities and at external workplaces where required. It gives learners a chance to apply their learning in practical settings.</p><p>Our facilities include greenhouses, nurseries and demonstration spaces that support observation, participation and reflection.</p></div><div className="image-frame"><img src={images.greenhouse} alt="Plants growing in a greenhouse" /></div></div></section><section className="section"><div className="container learner-grid"><div><p className="eyebrow">Who can apply</p><h2>A place to start, change direction or go further.</h2><p>Our target learners include school leavers, unemployed youth, aspiring farmers, agricultural entrepreneurs, existing agricultural workers and individuals interested in plant production and sustainable farming.</p></div><div className="entry-card"><h3>Minimum educational requirement</h3><strong>Grade 9</strong><p>Contact us to discuss the programme that best fits your goals and experience.</p><Button href="#/contact">Make a training enquiry</Button></div></div></section><ContactCta /></>;
}

function ServicesPage() {
  return <><PageIntro eyebrow="Landscaping services" title="Considered gardens. Practical care." text="Landscaping services for spaces that are designed, planted and maintained with purpose." image={images.landscape} /><section className="section"><div className="container"><SectionHeading eyebrow="Our services" title="One service category, six ways to help your space grow." text="From the first sketch to ongoing care, we bring a thoughtful and practical approach to landscaping." /><div className="service-grid service-grid-wide">{services.map(({ icon: Icon, title, text }) => <div className="service-card" key={title}><Icon size={28} /><h3>{title}</h3><p>{text}</p><a href="#/contact">Enquire about this service <ArrowUpRight size={15} /></a></div>)}</div></div></section><section className="section section-sage"><div className="container split-grid"><div className="image-frame"><img src={images.landscape} alt="Garden sprinkler watering a green lawn" /></div><div><p className="eyebrow">A considered process</p><h2>From vision to living landscape.</h2><p>Every garden has a different rhythm, from the way sunlight moves through a space to how people use it. We shape our landscaping work around those practical details.</p><div className="process-list"><p><span>01</span> Understand the space and the brief</p><p><span>02</span> Plan, prepare and select with care</p><p><span>03</span> Install, establish and maintain</p></div><Button href="#/contact">Discuss your landscape</Button></div></div></section><ContactCta /></>;
}

function ProjectsPage() {
  return <><PageIntro eyebrow="Projects" title="A visual portfolio of growing work." text="A place for Saena Botany’s training environments, landscapes and practical projects to take shape." image={images.landscape} /><section className="section"><div className="container"><SectionHeading eyebrow="Portfolio" title="Your projects will live here." text="These temporary placeholders make room for approved project names, descriptions and authentic photography." /><div className="project-grid project-grid-page"><ProjectCard large title="Add an approved landscape project" image={images.landscape} /><ProjectCard title="Add a facility story" image={images.greenhouse} /><ProjectCard title="Add a practical training story" image={images.learners} /><ProjectCard title="Add a completed garden" image={images.landscape} /></div></div></section><section className="section section-dark"><div className="container split-heading section-heading"><div><p className="eyebrow light-eyebrow">Ready to add your stories?</p><h2>Real work deserves real detail.</h2></div><div><p>Share your approved project photographs, locations and short descriptions to replace these placeholders.</p><Button href="#/contact" variant="light">Talk to us</Button></div></div></section></>;
}

function ProductsPage() {
  return <><PageIntro eyebrow="Products" title="Botanical products from a growing place." text="Explore selected greenhouse plants, botanical products and Spekboom teas from Saena Botany." image={images.tea} /><section className="section"><div className="container"><div className="catalogue-banner"><div><p className="eyebrow">WhatsApp catalogue</p><h2>Browse the full catalogue on WhatsApp.</h2><p>The final catalogue link will be added here once supplied.</p></div><a className="button button-primary disabled-link" href="#/contact">Catalogue link pending <ArrowUpRight size={17} /></a></div><SectionHeading eyebrow="Public price list" title="Selected products" text="Prices shown below reflect the current public price information supplied for this first version." /><div className="product-grid product-grid-page">{products.map((product) => <ProductCard product={product} key={product.name} />)}</div></div></section><section className="section section-sage"><div className="container split-grid"><div><p className="eyebrow">From our greenhouse</p><h2>Products with a close connection to place.</h2><p>Our botanical range includes dried leaves, teas and plants grown or prepared through our greenhouse and nursery activities.</p><p>Product availability and public prices may change. Contact Saena Botany for the latest information.</p></div><div className="image-frame"><img src={images.greenhouse} alt="Plants arranged in a greenhouse" /></div></div></section><ContactCta /></>;
}

function ContactPage() {
  return <><PageIntro eyebrow="Contact Saena Botany" title="Let’s find the right next step." text="Ask about agricultural training, landscaping services, botanical products or anything else you would like to explore." image={images.hero} /><section className="section"><div className="container contact-layout"><div><p className="eyebrow">Get in touch</p><h2>We are ready to hear from you.</h2><p className="lead">Choose the enquiry type that best matches what you need and send us a message.</p><div className="contact-details"><a href="tel:+27746301432"><span><Phone size={19} /></span><div><small>Telephone / WhatsApp</small><strong>074 630 1432</strong></div></a><a href="mailto:projects@saenabotany.co.za"><span><ArrowUpRight size={19} /></span><div><small>Email</small><strong>projects@saenabotany.co.za</strong></div></a></div><a className="whatsapp-link" href="https://wa.me/27746301432" target="_blank" rel="noreferrer"><MessageCircle size={19} /> Start a WhatsApp conversation</a></div><EnquiryForm /></div></section></>;
}

function EnquiryForm({ initialType = 'general' }: { initialType?: EnquiryType }) {
  const [type, setType] = useState<EnquiryType>(initialType);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setErrorMessage('');
    const form = new FormData(event.currentTarget);
    const fullName = String(form.get('fullName') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const phone = String(form.get('phone') ?? '').trim();
    const message = String(form.get('message') ?? '').trim();
    if (!fullName || !email || !message) {
      setStatus('error');
      setErrorMessage('Please complete your name, email address and message.');
      return;
    }
    if (!supabase) {
      setStatus('error');
      setErrorMessage('The enquiry service is not available right now. Please call or WhatsApp us directly.');
      return;
    }
    const { error } = await supabase.from('website_enquiries').insert({ full_name: fullName, email, phone: phone || null, enquiry_type: type, message });
    if (error) {
      setStatus('error');
      setErrorMessage('We could not submit your enquiry. Please call or WhatsApp us directly.');
      return;
    }
    setStatus('success');
    event.currentTarget.reset();
  }

  if (status === 'success') return <div className="form-card form-success"><div className="success-icon"><Check size={25} /></div><h3>Thank you for getting in touch.</h3><p>Your enquiry has been received. Saena Botany will follow up using the contact details you provided.</p><a href="#/home" className="text-link">Return to home <ArrowRight size={16} /></a></div>;

  return <form className="form-card" onSubmit={handleSubmit}><p className="eyebrow">Send an enquiry</p><h3>How can we help?</h3><label>Enquiry type<select value={type} onChange={(event) => setType(event.target.value as EnquiryType)}><option value="training">Training enquiry</option><option value="landscaping">Landscaping enquiry</option><option value="general">General enquiry</option></select></label><label>Your name<input name="fullName" type="text" autoComplete="name" required placeholder="Your full name" /></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label><label>Phone or WhatsApp <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" placeholder="074 630 1432" /></label><label>Your message<textarea name="message" required rows={5} placeholder="Tell us a little about what you need..." /></label>{status === 'error' && <p className="form-error" role="alert">{errorMessage}</p>}<button className="button button-primary form-submit" disabled={status === 'sending'} type="submit">{status === 'sending' ? 'Sending...' : 'Submit enquiry'} <ArrowRight size={17} /></button><p className="form-note">We will use your details only to respond to this enquiry. This form does not send email automatically.</p></form>;
}

export default App;
