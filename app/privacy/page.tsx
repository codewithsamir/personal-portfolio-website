import { Navbar } from "../_components/layout/Navbar";
import { Footer } from "../_components/layout/Footer";
import { Breadcrumb } from "../_components/ui/Breadcrumb";
import dbConnect from "@/lib/mongodb";
import PersonalInfo from "@/models/PersonalInfo";
import { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How this site collects, uses, and protects your information.",
};

export default async function PrivacyPolicyPage() {
  await dbConnect();
  const personalData = await PersonalInfo.findOne().lean();
  const personalInfo = personalData ? JSON.parse(JSON.stringify(personalData)) : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 pt-40 pb-32 px-6">
        <article className="max-w-3xl mx-auto space-y-10">
          <Breadcrumb items={[{ label: "Privacy Policy" }]} />

          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-black font-space-grotesk tracking-tighter leading-[0.95]">
              Privacy Policy
            </h1>
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">
              Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>

          <div className="prose prose-lg dark:prose-invert max-w-none space-y-8 text-foreground/90 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-2xl font-black font-space-grotesk">1. Overview</h2>
              <p>
                This website ({personalInfo?.name || "this portfolio"}) respects your privacy. This policy explains
                what information is collected when you visit, how it's used, and the choices you have.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-black font-space-grotesk">2. Information We Collect</h2>
              <p>
                We do not require account creation to browse this site. Information may be collected in the
                following ways:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Contact form:</strong> if you submit the contact form, we collect the name, email, and
                  message you provide, solely to respond to your inquiry.
                </li>
                <li>
                  <strong>Usage data:</strong> basic, non-identifying analytics such as pages viewed and article
                  view counts, used to understand what content is useful.
                </li>
                <li>
                  <strong>Cookies &amp; similar technologies:</strong> used by third-party services described below
                  to serve relevant content and ads.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-black font-space-grotesk">3. Advertising &amp; Google AdSense</h2>
              <p>
                This site may display ads served by Google AdSense. Google and its partners use cookies (including
                the DoubleClick cookie) to serve ads based on your prior visits to this and other websites. You can
                opt out of personalized advertising by visiting{" "}
                <a
                  href="https://adssettings.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold hover:underline"
                >
                  Google Ads Settings
                </a>
                , or generally at{" "}
                <a
                  href="https://www.aboutads.info/choices/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-bold hover:underline"
                >
                  aboutads.info
                </a>
                .
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-black font-space-grotesk">4. Third-Party Services</h2>
              <p>
                We use trusted third parties to operate this site, including hosting, database, media storage
                (Cloudinary), and — where enabled — Google AdSense. These providers process data under their own
                privacy policies.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-black font-space-grotesk">5. Your Choices</h2>
              <p>
                You can disable cookies in your browser settings, use ad-blocking or privacy extensions, and opt
                out of personalized ads via the links above. Disabling cookies may affect some site functionality.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-2xl font-black font-space-grotesk">6. Contact</h2>
              <p>
                Questions about this policy? Reach out at{" "}
                {personalInfo?.email ? (
                  <a href={`mailto:${personalInfo.email}`} className="text-primary font-bold hover:underline">
                    {personalInfo.email}
                  </a>
                ) : (
                  "the contact form on this site"
                )}
                .
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer personalInfo={personalInfo} />
    </div>
  );
}
