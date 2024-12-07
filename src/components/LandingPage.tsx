import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  // Automatically redirect signed-in users to the MatchingJobs page
  useEffect(() => {
    if (isSignedIn) {
      navigate('/match');
    }
  }, [isSignedIn, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">JobMatcher</h1>
          <Link to="/signin">
            <Button variant="outline">Sign In</Button>
          </Link>
        </nav>
      </header>

      <main className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-4xl font-bold mb-6">Find Your Perfect Job Match</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          JobMatcher uses advanced AI to analyze your resume and match you with
          the best job opportunities. Upload your resume, and we&aposll connect you
          with companies looking for your unique skills and experience.
          To learn more about us and if you have any questions, fell free to reach out to us by clicking<br /> 
          <Link to="/about" className='text-blue-500'>
             here
          </Link>.
        </p>

        <Link to="/signin">
          <Button size="lg" className="text-lg px-8 py-4">
            Sign In and Match with Jobs
          </Button>
        </Link>
      </main>

      <section className="container mx-auto px-4 py-16">
        <h3 className="text-2xl font-semibold mb-8 text-center">How It Works</h3>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-4">1. Upload Your Resume</h4>
            <p>Simply upload your resume, and our AI will analyze your skills and experience.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-4">2. Get Matched</h4>
            <p>Our algorithm matches your profile with job openings from top companies.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-xl font-semibold mb-4">3. Apply with Ease</h4>
            <p>Apply to your matched jobs directly through our platform, streamlining your job search.</p>
          </div>
        </div>
      </section>

      <footer className="bg-blue-600 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 JobMatcher. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
