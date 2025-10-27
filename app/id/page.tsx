import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const friends_id = [
  {
    name: "amorfateh",
    id: "249621132",
  },
  {
    name: "babusaka",
    id: "156606112",
  },
  {
    name: "swan",
    id: "221709803",
  },
  {
    name: "badu",
    id: "171280817",
  },
  {
    name: "juzgan",
    id: "172654677",
  },
  {
    name: "acil",
    id: "917763093",
  },
  {
    name: "acil teletubbies",
    id: "408354894",
  },
]

export default function PlayersPage() {
  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      {/* Friends Table */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm">Sample ID</h2>
            <Badge variant="secondary">{friends_id.length} players</Badge>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Steam ID</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {friends_id.map((friend, index) => (
                <TableRow key={friend.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="font-semibold">{friend.name}</TableCell>
                  <TableCell className="font-mono text-sm">{friend.id}</TableCell>
                  <TableCell className="text-right">
                    <Link href={`/id/${friend.id}`}>
                      <Button size="sm" variant="link">
                        View Profile
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
