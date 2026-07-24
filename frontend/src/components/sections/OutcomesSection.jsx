import { BarChart3, MessageSquare, Repeat, Rocket, ShieldCheck, Users } from 'lucide-react';
import { Card, SectionHeader } from '../ui';

const outcomes = [
  { icon: Users, title: 'Attract qualified customers', text: 'Campaigns and content aimed at the audience most likely to buy, not just reach.' },
  { icon: ShieldCheck, title: 'Improve online credibility', text: 'A site and social presence that reads as established, not improvised.' },
  { icon: BarChart3, title: 'Convert more visitors', text: 'Pages and funnels built around the action you actually want a visitor to take.' },
  { icon: MessageSquare, title: 'Keep content consistent', text: 'A planned calendar so posting never depends on finding time that week.' },
  { icon: Rocket, title: 'Launch stronger campaigns', text: 'Ads tested and structured before spend goes live, not after.' },
  { icon: Repeat, title: 'Simplify operations', text: 'Dashboards and internal tools that remove manual, repetitive work.' }
];

export default function OutcomesSection() {
  return (
    <section className="bg-charcoal-900 py-20 sm:py-28">
      <div className="section">
        <SectionHeader
          eyebrow="What changes"
          title="Practical outcomes, not vague promises."
          align="center"
        />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {outcomes.map(({ icon: Icon, title, text }) => (
            <Card key={title} hover={false}>
              <Icon className="text-brand-purple" size={22} />
              <h3 className="mt-4 text-base font-bold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/55">{text}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
