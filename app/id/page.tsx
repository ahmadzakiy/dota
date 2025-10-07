import { Badge } from "@/components/ui/badge"
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

const pro_players_id = [
  {
    name: "Ame",
    id: "898754153",
  },
  {
    name: "XinQ",
    id: "157475523",
  },
  {
    name: "Yatoro",
    id: "321580662",
  },
  {
    name: "Collapse",
    id: "302214028",
  },
  {
    name: "Mikoto",
    id: "301750126",
  },
  {
    name: "Whitemon",
    id: "136829091",
  },
  {
    name: "Topson",
    id: "94054712",
  },
  {
    name: "Satanic",
    id: "1044002267",
  },
  {
    name: "9Class",
    id: "164199202",
  },
]

export default function PlayersPage() {
  return (
    <div className="container mx-auto space-y-8 px-4 py-8">
      {/* Friends Table */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm">Friends</h2>
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
                    <a href={`/id/${friend.id}`}>View Profile</a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Pro Players Table */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-sm">Professional Players</h2>
            <Badge variant="secondary">{pro_players_id.length} players</Badge>
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
              {pro_players_id.map((player, index) => (
                <TableRow key={player.id}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell>{player.name}</TableCell>
                  <TableCell className="font-mono text-sm">{player.id}</TableCell>
                  <TableCell className="text-right">
                    <a href={`/id/${player.id}`}>View Profile</a>
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
