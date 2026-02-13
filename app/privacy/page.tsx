import Link from "next/link"
import { GradientAnimation } from "@/components/dynamic-imports"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <GradientAnimation
        containerClassName="absolute inset-0"
        fifthColor="192, 46, 26"
        firstColor="192, 46, 26"
        fourthColor="192, 46, 26"
        gradientBackgroundEnd="rgb(0, 0, 0)"
        gradientBackgroundStart="rgb(15, 23, 42)"
        interactive={false}
        secondColor="192, 46, 26"
        thirdColor="255, 255, 255"
      />

      <div className="container relative z-10 mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <Card className="bg-background/80 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-3xl">Privacy Policy</CardTitle>
              <CardDescription>Last updated: {new Date().toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <section>
                <h2 className="mb-3 font-semibold text-xl">What is Dota Wrapped?</h2>
                <p className="text-muted-foreground">
                  Dota Wrapped is a free, unofficial Dota 2 statistics application that provides
                  players with detailed insights about their gaming performance. We are not
                  affiliated with Valve Corporation, Dota 2, or OpenDota.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-semibold text-xl">Information We Collect</h2>
                <div className="space-y-3 text-muted-foreground">
                  <div>
                    <h3 className="font-medium text-foreground">Steam ID (Optional)</h3>
                    <p>
                      We only collect Steam IDs that users voluntarily enter to fetch their public
                      Dota 2 statistics.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Public Game Data</h3>
                    <p>
                      We fetch publicly available Dota 2 match data from OpenDota's API. This data
                      is already public and accessible to anyone.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Analytics Data</h3>
                    <p>
                      We use Google Analytics to understand how our website is used. This includes
                      anonymous usage data like page views and session duration.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-3 font-semibold text-xl">How We Use Your Information</h2>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>To display your Dota 2 statistics and performance insights</li>
                  <li>To improve our website functionality and user experience</li>
                  <li>To analyze website usage patterns through Google Analytics</li>
                  <li>We never store your Steam ID or personal data on our servers</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 font-semibold text-xl">Data We Don't Collect</h2>
                <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                  <li>Passwords or login credentials</li>
                  <li>Private Steam profile information</li>
                  <li>Personal identifying information</li>
                  <li>Payment information</li>
                  <li>Private match data or chat logs</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 font-semibold text-xl">Third-Party Services</h2>
                <div className="space-y-3 text-muted-foreground">
                  <div>
                    <h3 className="font-medium text-foreground">OpenDota API</h3>
                    <p>
                      We use OpenDota's API to fetch public Dota 2 statistics. Please review their
                      privacy policy for more information.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">Google Analytics</h3>
                    <p>
                      We use Google Analytics for website analytics. Google may collect data
                      according to their own privacy policy.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="mb-3 font-semibold text-xl">Data Security</h2>
                <p className="text-muted-foreground">
                  We implement appropriate security measures to protect your data. However, since we
                  only handle public Dota 2 statistics and don't store personal information, the
                  risk is minimal. All data transmission is encrypted using HTTPS.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-semibold text-xl">Your Rights</h2>
                <p className="text-muted-foreground">
                  Since we don't store personal data, there's no data to delete or modify. If you
                  have concerns about your public Dota 2 statistics, you may need to adjust your
                  Steam profile privacy settings or contact OpenDota directly.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-semibold text-xl">Contact Information</h2>
                <p className="text-muted-foreground">
                  If you have questions about this privacy policy, please contact us through our
                  GitHub repository issues or other official channels.
                </p>
              </section>

              <section>
                <h2 className="mb-3 font-semibold text-xl">Disclaimer</h2>
                <p className="text-muted-foreground">
                  Dota Wrapped is an unofficial application and is not endorsed by or affiliated
                  with Valve Corporation. Dota 2 is a trademark of Valve Corporation. All game data
                  and statistics are provided as-is without warranty.
                </p>
              </section>
            </CardContent>
          </Card>

          <div className="mt-6 text-center">
            <Link className="text-muted-foreground underline hover:text-foreground" href="/">
              ← Back to Dota Wrapped
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
