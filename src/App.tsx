import { FormEvent, useEffect, useState } from 'react';
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ChevronRight,
  CircleCheck,
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
  return <div className="stat-strip"><div><strong>03</strong><span>Accredited qualifications</span></div><div><strong>NQF 1–2</strong><span>Agricultural learning pathways</span></div><div><strong>661739743</strong><span>AgriSETA provider number</span></div></div>;
}

function HomePage() {
  return <>
    <section className="hero"><div className="hero-image" style={{ backgroundImage: `url(${images.hero})` }} /><div className="container hero-content"><div className="hero-copy"><p className="eyebrow light-eyebrow">Training • Growth • Opportunity</p><h1>Create a path to a <em>greener</em> future.</h1><p>Practical agricultural training and skills development for people ready to grow their knowledge, livelihoods and communities.</p><div className="hero-actions"><Button href="#/training" variant="light">Explore training</Button><Button href="#/about" variant="outline">Discover Saena Botany</Button></div></div><div className="hero-note"><span>01</span><p>Learning grounded in the land, designed for real opportunity.</p></div></div></section>
    <div className="container"><StatStrip /></div>
    <section className="section section-paper"><div className="container split-grid intro-split"><div className="image-frame tall"><img src={images.learners} alt="Learners tending plants in a greenhouse" /><span className="image-caption">Practical learning, every step of the way</span></div><div><p className="eyebrow">Who we are</p><h2>Where learning takes root.</h2><p className="lead">Saena Botany is a South African Training & Skills Development Organisation focused on practical agricultural learning and sustainable growth.</p><p>We connect classroom-based theory with hands-on experience, giving learners the confidence to understand plant production, mixed farming systems and the everyday work behind a thriving agricultural future.</p><Button href="#/about">Meet Saena Botany</Button></div></div></section>
    <TrainingPreview />
    <FacilitiesSection />
    <section className="section section-sage"><div className="container split-grid wil-split"><div><p className="eyebrow">Workplace integrated learning</p><h2>Knowledge becomes capability in the field.</h2><p className="lead">Our WIL approach gives learners the opportunity to apply classroom learning in real agricultural environments.</p><p>Work Integrated Learning takes place at Saena Botany’s own agricultural facilities and at external workplaces where required. It is a practical bridge between qualification and opportunity.</p><Button href="#/training">Understand our approach</Button></div><div className="quote-card"><CircleCheck size={32} /><p>“Learning is more powerful when people can see, practise and reflect on what they are learning.”</p><span>Saena Botany learning approach</span></div></div></section>
    <ServicesPreview />
    <ProjectsPreview />
    <ProductsPreview />
    <WhyChoose />
    <FaqSection />
    <ContactCta />
  </>;
}

function TrainingPreview() {
  return <section className="section section-dark"><div className="container"><div className="section-heading split-heading"><div><p className="eyebrow light-eyebrow">Training & Skills Development</p><h2>Build a future with practical skills.</h2></div><p>Accredited agricultural qualifications, taught through a balance of theory, practice and workplace exposure.</p></div><div className="qualification-grid">{qualifications.map((qualification, index) => <div className={`qualification-card ${index === 1 ? 'featured' : ''}`} key={qualification.id}><span>{qualification.level}</span><h3>{qualification.title}</h3><p>{qualification.id}</p><a href="#/training">View qualification <ArrowUpRight size={16} /></a></div>)}</div><div className="section-action"><Button href="#/training" variant="light">View all training information</Button></div></div></section>;
}

function FacilitiesSection() {
  const facilities = [{ title: 'Greenhouses', icon: Sprout, text: 'Protected growing environments where learners can observe and practise plant production.' }, { title: 'Eco bathrooms', icon: Leaf, text: 'Thoughtful facilities that reflect our commitment to responsible, practical spaces.' }, { title: 'Demonstration spaces', icon: GraduationCap, text: 'Purposeful areas for seeing agricultural methods in action.' }, { title: 'Nurseries', icon: TreePine, text: 'Living learning spaces for propagation, plant care and growth.' }];
  return <section className="section"><div className="container"><SectionHeading eyebrow="Our facilities" title="Learning environments with life in them." text="Our facilities bring practical agricultural learning to life, giving learners space to observe, practise and build confidence." /><div className="facility-layout"><div className="facility-image"><img src={images.greenhouse} alt="Rows of plants in a greenhouse" /><div className="image-badge">Practical by design</div></div><div className="facility-list">{facilities.map(({ title, icon: Icon, text }) => <div className="facility-item" key={title}><div className="icon-box"><Icon size={22} /></div><div><h3>{title}</h3><p>{text}</p></div><ChevronRight size={18} /></div>)}</div></div></div></section>;
}

function ServicesPreview() {
  return <section className="section section-paper"><div className="container"><div className="split-heading section-heading"><div><p className="eyebrow">Landscaping services</p><h2>Spaces made to grow beautifully.</h2></div><div><p>From the first plan to ongoing care, our landscaping services bring considered planting and practical maintenance together.</p><Button href="#/services">Explore services</Button></div></div><div className="service-grid">{services.slice(0, 3).map(({ icon: Icon, title, text }) => <div className="service-card" key={title}><Icon size={28} /><h3>{title}</h3><p>{text}</p><a href="#/services">Learn more <ArrowUpRight size={15} /></a></div>)}</div></div></section>;
}

function ProjectsPreview() {
  return <section className="section"><div className="container"><SectionHeading eyebrow="Featured projects" title="A portfolio waiting to tell its story." text="This first collection is ready for your authentic project photography and descriptions." /><div className="project-grid"><ProjectCard large title="Project showcase placeholder" image={images.landscape} /><ProjectCard title="Green space placeholder" image={images.greenhouse} /><ProjectCard title="Practical growing placeholder" image={images.learners} /></div><div className="center-action"><Button href="#/projects" variant="outline">View project portfolio</Button></div></div></section>;
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
  const reasons = [{ icon: GraduationCap, title: 'Accredited learning', text: 'Training aligned with AgriSETA-accredited agricultural qualifications.' }, { icon: Users, title: 'Practical support', text: 'A learning approach that makes space for theory, practice and workplace exposure.' }, { icon: Sprout, title: 'A culture of growth', text: 'A grounded environment for learners, aspiring farmers and agricultural workers.' }];
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
  return <><PageIntro eyebrow="About Saena Botany" title="Growing people, places and possibility." text="A South African organisation bringing practical agricultural learning and purposeful landscaping together." image={images.hero} /><section className="section"><div className="container narrow-copy"><p className="eyebrow">Our background</p><h2>Rooted in practical opportunity.</h2><p className="lead">Saena Botany exists to create a path for people who want to learn, work and grow through agriculture.</p><p>Our work is shaped by the belief that skills development should be connected to real environments. Through agricultural training, workplace exposure, practical facilities and landscaping services, we create opportunities to learn by doing and to build a more confident relationship with the land.</p></div></section><section className="section section-sage"><div className="container values-grid"><div><p className="eyebrow">Our mission</p><h2>Make practical learning accessible and meaningful.</h2><p>We aim to equip learners with relevant agricultural skills, hands-on experience and a foundation for continued growth.</p></div><div><p className="eyebrow">Our vision</p><h2>A future shaped by capable people and healthy environments.</h2><p>We see agriculture as a pathway to opportunity, enterprise and sustainable communities.</p></div></div></section><section className="section"><div className="container split-grid approach-grid"><div className="image-frame"><img src={images.learners} alt="People working with plants in a greenhouse" /></div><div><p className="eyebrow">Our approach</p><h2>See it. Practise it. Grow into it.</h2><p>Our approach combines classroom-based theory with hands-on practical training. Learners are encouraged to ask questions, build confidence and apply knowledge in real agricultural settings.</p><p>We operate with a focus on credibility, care, environmental awareness and the practical realities of work and enterprise.</p></div></div></section><ContactCta /></>;
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
