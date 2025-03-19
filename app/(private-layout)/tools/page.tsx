import { fetchTools } from '@/actions/tools'
import { CreateToolButton } from '@/components/tools/create-tool-button'
import { ToolItem } from '@/components/tools/tool-item'

export default async function ToolList() {
  const tools = await fetchTools()

  return (
    <div>
      <div className="mb-4 flex justify-between">
        <h2 className="text-xl font-semibold">Your Tools</h2>
        <CreateToolButton />
      </div>

      {tools.length === 0 ? (
        <p className="text-muted-foreground">No tools found. Create your first tool to get started.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolItem key={tool.id} tool={tool} />
          ))}
        </div>
      )}
    </div>
  )
}
