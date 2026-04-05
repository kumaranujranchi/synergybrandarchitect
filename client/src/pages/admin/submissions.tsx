import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useLocation } from "wouter";
import { format } from "date-fns";
import { 
  ArrowUpDown, 
  Calendar, 
  Download, 
  Filter, 
  Plus, 
  Search, 
  Tag, 
  Trash2, 
  X,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MessageSquare,
  ChevronDown,
  ChevronRight
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import AdminLayout from "@/components/admin/layout";

export default function SubmissionsPage() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showNotesDialog, setShowNotesDialog] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any | null>(null);
  const [expandedSubmission, setExpandedSubmission] = useState<string | null>(null);
  const [newNote, setNewNote] = useState("");
  const { toast } = useToast();

  // Authentication check
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAuthenticated = !!user;

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/admin/login');
    }
  }, [isAuthenticated, setLocation]);

  // Convex Queries
  const submissions = useQuery(api.submissions.getSubmissions) || [];
  
  // Convex Mutations
  const updateStatusMutation = useMutation(api.submissions.updateSubmissionStatus);
  const deleteMutation = useMutation(api.submissions.deleteSubmission);
  const addNoteMutation = useMutation(api.submissions.addSubmissionNote);

  // Filtering logic
  const filteredSubmissions = (submissions as any[]).filter(sub => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      sub.name.toLowerCase().includes(searchLower) ||
      sub.email.toLowerCase().includes(searchLower) ||
      sub.phone.toLowerCase().includes(searchLower) ||
      sub.message.toLowerCase().includes(searchLower);
    
    const matchesStatus = statusFilter === "all" || sub.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const exportToCSV = () => {
    if (!filteredSubmissions.length) {
      toast({
        title: "No data to export",
        description: "There are no submissions matching your filters.",
        variant: "destructive",
      });
      return;
    }

    const headers = ["ID", "Name", "Email", "Phone", "Service", "Message", "Status", "Date"];
    const csvRows = [
      headers.join(','),
      ...filteredSubmissions.map(sub => [
        sub._id,
        `"${sub.name.replace(/"/g, '""')}"`,
        sub.email,
        sub.phone,
        sub.service,
        `"${sub.message.replace(/"/g, '""')}"`,
        sub.status,
        new Date(sub.submittedAt).toISOString()
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    
    toast({ title: "Export successful" });
  };

  const statusConfig: Record<string, any> = {
    new: { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: <AlertCircle className="h-4 w-4 mr-1" />, label: 'New' },
    in_progress: { color: 'bg-amber-50 text-amber-700 border-amber-200', icon: <Clock className="h-4 w-4 mr-1" />, label: 'In Progress' },
    pending: { color: 'bg-purple-50 text-purple-700 border-purple-200', icon: <Clock className="h-4 w-4 mr-1" />, label: 'Pending' },
    delivered: { color: 'bg-green-50 text-green-700 border-green-200', icon: <CheckCircle className="h-4 w-4 mr-1" />, label: 'Closed' },
    lost: { color: 'bg-red-50 text-red-700 border-red-200', icon: <XCircle className="h-4 w-4 mr-1" />, label: 'Not Interested' }
  };

  if (!isAuthenticated) return null;

  return (
    <AdminLayout>
      <main className="flex-1 p-6">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold">Lead Management</h1>
            <Button className="bg-[#FF6B00] text-white hover:bg-[#FF8533]" onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-2" /> Export CSV
            </Button>
          </div>

          <div className="bg-white p-4 rounded-lg shadow-sm border flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search leads..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-48">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {Object.entries(statusConfig).map(([key, cfg]) => (
                    <SelectItem key={key} value={key}>{cfg.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Leads ({filteredSubmissions.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {!filteredSubmissions.length ? (
                <div className="text-center py-12 text-gray-500">No leads found.</div>
              ) : (
                <div className="space-y-4">
                  {filteredSubmissions.map((sub: any) => {
                    const cfg = statusConfig[sub.status] || { label: sub.status, color: 'bg-gray-100' };
                    const isExpanded = expandedSubmission === sub._id;

                    return (
                      <div key={sub._id} className={`border rounded-lg overflow-hidden transition-all ${isExpanded ? 'ring-1 ring-blue-500' : ''}`}>
                        <div 
                          className="p-4 flex flex-col sm:flex-row justify-between items-center cursor-pointer hover:bg-gray-50"
                          onClick={() => setExpandedSubmission(isExpanded ? null : sub._id)}
                        >
                          <div className="flex items-center gap-3">
                            {isExpanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
                            <div>
                              <div className="font-semibold text-lg">{sub.name}</div>
                              <div className="text-sm text-gray-500">{format(sub.submittedAt, 'MMM dd, yyyy HH:mm')}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3 mt-3 sm:mt-0">
                            <Badge className={`${cfg.color} border`}>{cfg.label}</Badge>
                            <div onClick={e => e.stopPropagation()}>
                              <Select 
                                value={sub.status} 
                                onValueChange={async (status) => {
                                  await updateStatusMutation({ id: sub._id, status });
                                  toast({ title: "Status updated" });
                                }}
                              >
                                <SelectTrigger className="h-8 w-32"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                  {Object.entries(statusConfig).map(([key, cfg]) => (
                                    <SelectItem key={key} value={key}>{cfg.label}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>

                        {isExpanded && (
                          <div className="p-4 border-t bg-gray-50 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              <div><Label className="text-xs uppercase text-gray-500">Email</Label><div>{sub.email}</div></div>
                              <div><Label className="text-xs uppercase text-gray-500">Phone</Label><div>{sub.phone}</div></div>
                              <div><Label className="text-xs uppercase text-gray-500">Service</Label><div>{sub.service}</div></div>
                            </div>
                            <div>
                              <Label className="text-xs uppercase text-gray-500">Message</Label>
                              <div className="mt-1 p-3 bg-white border rounded whitespace-pre-wrap text-sm">{sub.message}</div>
                            </div>

                            <div className="space-y-2">
                              <Label className="text-xs uppercase text-gray-500">Internal Notes</Label>
                              <div className="space-y-2">
                                {sub.notes?.map((note: any, i: number) => (
                                  <div key={i} className="bg-white p-2 rounded border text-sm flex justify-between">
                                    <span>{note.content}</span>
                                    <span className="text-xs text-gray-400">{format(note.createdAt, 'MMM dd')}</span>
                                  </div>
                                ))}
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="w-full border-dashed"
                                  onClick={() => {
                                    setSelectedSubmission(sub);
                                    setShowNotesDialog(true);
                                  }}
                                >
                                  <Plus className="h-3 w-3 mr-1" /> Add Note
                                </Button>
                              </div>
                            </div>

                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => {
                                  setSelectedSubmission(sub);
                                  setShowDeleteDialog(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4 mr-1" /> Delete Lead
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Lead?</DialogTitle>
            <DialogDescription>This action is permanent.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button 
              variant="destructive" 
              onClick={async () => {
                await deleteMutation({ id: selectedSubmission._id });
                setShowDeleteDialog(false);
                toast({ title: "Deleted successfully" });
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showNotesDialog} onOpenChange={setShowNotesDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Note</DialogTitle></DialogHeader>
          <div className="py-4">
            <Textarea 
              placeholder="Type your note here..." 
              value={newNote} 
              onChange={e => setNewNote(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNotesDialog(false)}>Cancel</Button>
            <Button 
              onClick={async () => {
                if (!newNote.trim()) return;
                await addNoteMutation({ id: selectedSubmission._id, content: newNote });
                setNewNote("");
                setShowNotesDialog(false);
                toast({ title: "Note added" });
              }}
            >
              Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}