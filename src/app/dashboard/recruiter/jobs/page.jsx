import { companyjob } from '@/lib/api/jobs'
import { Table, Button, Chip } from "@heroui/react";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

export default async function page() {
  const companyId = "dj1234"
  const data = await companyjob(companyId)

  // Mapping status to colors for the HeroUI Chip component
  const statusColorMap = {
    active: "success",
    inactive: "danger",
    pending: "warning",
  };

  return (
    /* The "dark" class triggers HeroUI dark mode; "bg-black text-white" sets the outer page theme */
    <div className="dark bg-black text-white min-h-screen p-6">
      <div className="w-full overflow-x-auto">
        
        {/* Removed global classNames prop to eliminate the React DOM error */}
        <Table aria-label="Jobs Table" className="max-w-full">
          <Table.ScrollContainer className="bg-black border border-neutral-800 rounded-xl overflow-hidden">
            <Table.Content className="min-w-[800px] bg-black text-white">

              {/* Styled headers using local className props */}
              <Table.Header className="bg-neutral-900 border-b border-neutral-800">
                <Table.Column isRowHeader className="bg-neutral-900 text-white font-semibold py-3 px-4">JOB TITLE</Table.Column>
                <Table.Column className="bg-neutral-900 text-white font-semibold py-3 px-4">CATEGORY</Table.Column>
                <Table.Column className="bg-neutral-900 text-white font-semibold py-3 px-4">STATUS</Table.Column>
                <Table.Column className="bg-neutral-900 text-white font-semibold py-3 px-4 text-end">ACTIONS</Table.Column>
              </Table.Header>

              {/* Table Body styling */}
              <Table.Body>
                {data.map((job) => (
                  <Table.Row key={job._id} className="border-b border-neutral-900 hover:bg-neutral-900/50 transition-colors">
                    
                    <Table.Cell className="py-4 px-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-sm text-white">
                          {job.jobTitle}
                        </span>
                        <span className="text-xs text-neutral-400">
                          {job.location}
                        </span>
                      </div>
                    </Table.Cell>

                    <Table.Cell className="py-4 px-4">
                      <span className="text-sm text-neutral-200">{job.jobCategory}</span>
                    </Table.Cell>

                    <Table.Cell className="py-4 px-4">
                      <Chip 
                        size="sm" 
                        variant="flat"
                        color={statusColorMap[job.status] || "default"}
                      >
                        {job.status}
                      </Chip>
                    </Table.Cell>

                    <Table.Cell className="py-4 px-4">
                      <div className="flex justify-end gap-2">
                        <Button isIconOnly size="sm" variant="light" className="text-neutral-400 hover:text-white">
                          <FiEye />
                        </Button>
                        <Button isIconOnly size="sm" variant="light" className="text-neutral-400 hover:text-white">
                          <FiEdit />
                        </Button>
                        <Button isIconOnly size="sm" color="danger" variant="light">
                          <FiTrash2 />
                        </Button>
                      </div>
                    </Table.Cell>

                  </Table.Row>
                ))}
              </Table.Body>

            </Table.Content>
          </Table.ScrollContainer>
        </Table>

      </div>
    </div>
  )
}