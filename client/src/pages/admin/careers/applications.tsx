import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useLocation } from "wouter";
import AdminLayout from "@/components/admin/layout";
import { 
  FileText, 
  Search, 
  ExternalLink,
  MoreHorizontal,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Briefcase,
  Download,
  Eye,
  Loader2
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";
import { useState } from "react";

// Component to resolve and show resume actions
function ResumeActions({ storageId }: { storageId: string }) {
  const fileUrl = useQuery(api.jobs.getFileUrl, { storageId });
  const [viewOpen, setViewOpen] = useState(false);

  if (!storageId) return <span className="text-xs text-gray-400">No Resume</span>;
  if (fileUrl === undefined) return <Loader2 size={14} className="animate-spin text-gray-400" />;
  if (fileUrl === null) return <span className="text-xs text-red-400">File not found</span>;

  const isPdf = !fileUrl.includes(".doc");

  return (
    <>
      <div className="flex items-center gap-1.5">
        {/* VIEW button */}
        {isPdf ? (
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5 text-blue-600 border-blue-200 hover:bg-blue-50"
            onClick={() => setViewOpen(true)}
          >
            <Eye size={13} /> View
          </Button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="h-8 text-xs gap-1.5 text-blue-600 border-blue-200 hover:bg-blue-50"
            onClick={() => window.open(fileUrl, "_blank")}
          >
            <Eye size={13} /> View
          </Button>
        )}

        {/* DOWNLOAD button */}
        <Button
          variant="outline"
          size="sm"
          className="h-8 text-xs gap-1.5 text-green-700 border-green-200 hover:bg-green-50"
          onClick={async () => {
            try {
              const response = await fetch(fileUrl);
              const blob = await response.blob();
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `resume-${storageId.slice(-8)}.pdf`;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
              URL.revokeObjectURL(url);
            } catch {
              window.open(fileUrl, "_blank");
            }
          }}
        >
          <Download size={13} /> Download
        </Button>
      </div>

      {/* PDF Preview Modal */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-4xl h-[90vh] flex flex-col p-0 gap-0">
          <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2">
                <FileText size={18} className="text-orange-500" />
                Resume Preview
              </DialogTitle>
              <div className="flex items-center gap-2 pr-8">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 text-xs gap-1.5"
                  onClick={() => window.open(fileUrl, "_blank")}
                >
                  <ExternalLink size={13} /> Open in New Tab
                </Button>
                <Button
                  size="sm"
                  className="h-8 text-xs gap-1.5 bg-green-600 hover:bg-green-700 text-white"
                  onClick={async () => {
                    try {
                      const response = await fetch(fileUrl);
                      const blob = await response.blob();
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `resume-${storageId.slice(-8)}.pdf`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    } catch {
                      window.open(fileUrl, "_blank");
                    }
                  }}
                >
                  <Download size={13} /> Download
                </Button>
              </div>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-hidden">
            <iframe
              src={`${fileUrl}#toolbar=1`}
              className="w-full h-full border-0"
              title="Resume Preview"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default function AdminApplicationsList() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const searchString = typeof window !== "undefined" ? window.location.search : "";
  const urlParams = new URLSearchParams(searchString);
  const jobIdFilter = urlParams.get("jobId");

  const applications = useQuery(api.jobs.listApplications, {}) || [];
  const jobs = useQuery(api.jobs.listJobs, {}) || [];
  const updateStatus = useMutation(api.jobs.updateApplicationStatus);

  const filteredApps = applications.filter((app: any) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJob = !jobIdFilter || app.jobId === jobIdFilter;
    return matchesSearch && matchesJob;
  });

  const getJobTitle = (jobId: string) => {
    return jobs.find((j: any) => j._id === jobId)?.title || "Unknown Job";
  };

  const handleStatusUpdate = async (id: any, status: string) => {
    try {
      await updateStatus({ id, status });
      toast({ title: `Status updated to ${status}` });
    } catch (e: any) {
      toast({ title: "Update failed", variant: "destructive" });
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Applications</h1>
            <p className="text-gray-500">
              {jobIdFilter
                ? `Showing applications for: ${getJobTitle(jobIdFilter)}`
                : "All candidate applications across all jobs."}
            </p>
          </div>
          <Button variant="outline" onClick={() => setLocation("/admin/careers")}>
            <Briefcase className="h-4 w-4 mr-2" />
            Back to Jobs
          </Button>
        </div>

        <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search candidates..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            {jobIdFilter && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLocation("/admin/careers/applications")}
                className="text-blue-600"
              >
                Clear Job Filter
              </Button>
            )}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Candidate</TableHead>
                <TableHead>Applied For</TableHead>
                <TableHead>Resume</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!applications.length ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                    No applications received yet.
                  </TableCell>
                </TableRow>
              ) : filteredApps.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-32 text-center text-gray-500">
                    No applications match your search.
                  </TableCell>
                </TableRow>
              ) : (
                filteredApps.map((app: any) => (
                  <TableRow key={app._id} className="hover:bg-gray-50/50 transition-colors">
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold text-gray-900">{app.name}</span>
                        <div className="flex flex-col gap-0.5 text-xs text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Mail size={12} /> {app.email}
                          </span>
                          <span className="flex items-center gap-1">
                            <Phone size={12} /> {app.phone}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          {app.portfolioUrl && (
                            <a
                              href={app.portfolioUrl}
                              target="_blank"
                              className="text-[10px] text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <ExternalLink size={10} /> Portfolio
                            </a>
                          )}
                          {app.linkedinUrl && (
                            <a
                              href={app.linkedinUrl}
                              target="_blank"
                              className="text-[10px] text-blue-600 hover:underline flex items-center gap-1"
                            >
                              <ExternalLink size={10} /> LinkedIn
                            </a>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-medium">{getJobTitle(app.jobId)}</span>
                    </TableCell>
                    <TableCell>
                      <ResumeActions storageId={app.resumeUrl} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-gray-500">
                        <Calendar size={14} />
                        {format(app.appliedAt, "MMM d, h:mm a")}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          app.status === "hired"
                            ? "default"
                            : app.status === "rejected"
                            ? "destructive"
                            : app.status === "shortlisted"
                            ? "secondary"
                            : "outline"
                        }
                        className={
                          app.status === "pending"
                            ? "bg-orange-50 text-orange-700 border-orange-200"
                            : ""
                        }
                      >
                        {app.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <div className="px-2 py-1.5 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            Update Status
                          </div>
                          <DropdownMenuItem
                            onClick={() => handleStatusUpdate(app._id, "shortlisted")}
                            className="text-blue-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" /> Shortlist
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusUpdate(app._id, "hired")}
                            className="text-green-600"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" /> Mark as Hired
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusUpdate(app._id, "rejected")}
                            className="text-red-600"
                          >
                            <XCircle className="h-4 w-4 mr-2" /> Reject
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleStatusUpdate(app._id, "reviewed")}
                          >
                            <Clock className="h-4 w-4 mr-2" /> Mark as Reviewed
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
