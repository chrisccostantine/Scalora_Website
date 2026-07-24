import PageMeta from '../seo/PageMeta';
import ProcessSteps from '../components/sections/ProcessSteps';
import CTASection from '../components/sections/CTASection';

export default function ProcessPage() {
  return (
    <>
      <PageMeta
        title="Process"
        description="How Scalora moves from discovery to a launched campaign, website, or application."
        path="/process"
      />
      <div className="pt-8" />
      <ProcessSteps />
      <CTASection />
    </>
  );
}
