import { fetchTools } from '@/actions/tools'
import { CreateToolButton } from '@/components/tools/create-tool-button'
import { ToolItem } from '@/components/tools/tool-item'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default async function ToolList() {
  const myTools = await fetchTools('my')
  const allTools = await fetchTools('all')

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">AI Tools</h2>
        <CreateToolButton />
      </div>

      <Tabs defaultValue="all-tools" className="w-full">
        <TabsList>
          <TabsTrigger value="all-tools">All Tools</TabsTrigger>
          <TabsTrigger value="my-tools">My Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="all-tools">
          {allTools.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">No public tools available.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {allTools.map((tool) => (
                <ToolItem key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="my-tools">
          {myTools.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              No tools found. Create your first tool to get started.
            </p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {myTools.map((tool) => (
                <ToolItem key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
