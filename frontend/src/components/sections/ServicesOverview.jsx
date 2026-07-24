import { Link } from 'react-router-dom';
import {
  Code2,
  GraduationCap,
  Megaphone,
  MonitorSmartphone,
  Palette,
  ShoppingBag,
  Smartphone
} from 'lucide-react';
import { Button, Card, SectionHeader } from '../ui';

const iconMap = { ShoppingBag, MonitorSmartphone, Code2, Smartphone, Palette, Megaphone, GraduationCap };

export default function ServicesOverview({ services }) {
  return (
    <section id="services" className="bg-charcoal-950 py-20 sm:py-28">
      <div className="section">
        <SectionHeader
          eyebrow="Services"
          title="Everything a growing business needs to be found, trusted, and bought from."
          description="Advertising, content, e-commerce, and software — run as one connected system instead of five separate vendors."
          action={
            <Button as={Link} to="/services" variant="secondary" showArrow className="shrink-0">
              View all services
            </Button>
          }
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <Card key={service.id}>
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-gradient-soft">
                  <Icon className="text-brand-purple" size={22} />
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">{service.title}</h3>
                <p className="mt-2.5 text-sm leading-6 text-white/55">{service.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
