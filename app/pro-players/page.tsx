import { ProPlayersTable } from "@/components/pro-players-table"
import { getCachedProPlayers } from "@/lib/opendota-api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Cache this page for 12 hours (43200 seconds) - Pro players data changes infrequently
export const revalidate = 43200

export default async function ProPlayersPage() {
  const players = await getCachedProPlayers()

  return (
    <div className="container mx-auto mb-20 px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Pro Players</CardTitle>
        </CardHeader>
        <CardContent>
          <ProPlayersTable players={players} />
        </CardContent>
      </Card>
    </div>
  )
}
