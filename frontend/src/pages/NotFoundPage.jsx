import { Link } from 'react-router-dom';
import PageMeta from '../seo/PageMeta';
import { Button } from '../components/ui';

export default function NotFoundPage() {
  return (
    <>
      <PageMeta title="Page not found" description="This page doesn't exist." path="/404" />
      <section className="grid min-h-[70vh] place-items-center bg-charcoal-950 text-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-gradient">404</p>
          <h1 className="mt-4 text-3xl font-extrabold text-white">This page doesn&rsquo;t exist.</h1>
          <Button as={Link} to="/" className="mt-8">
            Back to home
          </Button>
        </div>
      </section>
    </>
  );
}
