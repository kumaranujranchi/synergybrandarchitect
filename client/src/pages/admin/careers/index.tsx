import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useLocation } from "wouter";
import AdminLayout from "@/components/admin/layout";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  ExternalLink,
  MoreHorizontal,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useState } from "react";

export default function AdminCareersList() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const jobs = useQuery(api.jobs.listJobs, {}) || [];
  const deleteMutation = useMutation(api.jobs.deleteJob);

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Careers Management</h1>
            <p className="text-gray-500">Manage your company's job openings and applications.</p>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="outline" 
              onClick={() => setLocation("/admin/careers/applications")}
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <Users className="h-4 w-4 mr-2" />
              View All Applications
            </Button>
            <Button onClick={() => setLocation("/admin/careers/new")} className="bg-[#FF6B00] text-white hover:bg-[#FF8533]">
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Job Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Posted Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!jobs.length ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                    No jobs posted yet.
                  </TableCell>
                </TableRow>
              ) : (
                filteredJobs.map((job: any) => (
                  <TableRow key={job._id}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">{job.title}</span>
                        <span className="text-xs text-gray-500">{job.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{job.department}</Badge>
                    </TableCell>
                    <TableCell className="text-sm">{job.type}</TableCell>
                    <TableCell>
                      <Badge variant={job.status === "open" ? "default" : job.status === "closed" ? "destructive" : "secondary"}>
                        {job.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">
                      {format(job.createdAt, "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setLocation(`/admin/careers/edit/${job._id}`)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Job
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => setLocation(`/admin/careers/applications?jobId=${job._id}`)}>
                            <Users className="h-4 w-4 mr-2" />
                            View Applications
                          </DropdownMenuItem>
                          {job.status === "open" && (
                            <DropdownMenuItem onClick={() => window.open(`/careers/${job.slug}`, "_blank")}>
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View Live
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={async () => {
                              if (confirm("Are you sure you want to delete this job listing? All associated applications will remain but be orphaned.")) {
                                try {
                                  await deleteMutation({ id: job._id });
                                  toast({ title: "Job listing deleted" });
                                } catch (e: any) {
                                  toast({ title: "Delete failed", description: e.message, variant: "destructive" });
                                }
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
}
