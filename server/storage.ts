import { User, InsertUser, UpdateUser, Blog, InsertBlog, UpdateBlog } from '@shared/schema';
import bcrypt from 'bcrypt';

export interface IStorage {
  // User methods
  createUser(userData: InsertUser): Promise<User>;
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  updateUser(id: number, userData: UpdateUser): Promise<User | undefined>;
  listUsers(): Promise<User[]>;
  deleteUser(id: number): Promise<boolean>;
  validateUserCredentials(email: string, password: string): Promise<User | null>;



  // Submission methods
  createSubmission(data: any): Promise<any>;
  listSubmissions(filters?: any): Promise<any[]>;
  getSubmission(id: number): Promise<any | undefined>;
  updateSubmission(id: number, data: any): Promise<any>;
  deleteSubmission(id: number): Promise<boolean>;

  // Note methods
  getSubmissionNotes(submissionId: number): Promise<any[]>;
  addNote(data: any): Promise<any>;

  // Audit methods
  logAudit(data: any): Promise<void>;

  // Auth/Password methods
  createPasswordResetToken(userId: number): Promise<string>;
  validateResetToken(token: string): Promise<User | undefined>;
  markResetTokenAsUsed(token: string): Promise<void>;
  createOTP(userId: number, email: string): Promise<string>;
  validateOTP(email: string, otp: string): Promise<User | undefined>;
  markOTPAsUsed(email: string, otp: string): Promise<void>;

  // Blog methods
  createBlog(blogData: InsertBlog): Promise<Blog>;
  getBlog(id: number): Promise<Blog | undefined>;
  getBlogBySlug(slug: string): Promise<Blog | undefined>;
  updateBlog(id: number, blogData: UpdateBlog): Promise<Blog | undefined>;
  deleteBlog(id: number): Promise<boolean>;
  listBlogs(filters?: { status?: string }): Promise<Blog[]>;
}

export class MemStorage implements IStorage {
  private users = new Map<number, User>();

  private submissions = new Map<number, any>();
  private notes = new Map<number, any[]>();
  private resetTokens = new Map<string, { userId: number; expiresAt: Date; used: boolean }>();
  private otps = new Map<string, { userId: number; code: string; expiresAt: Date; used: boolean }>();
  private blogs = new Map<number, Blog>();
  
  private lastUserId = 0;
  private lastSubmissionId = 0;
  private lastNoteId = 0;
  private lastBlogId = 0;

  constructor() {
    this.initializeData();
  }

  private async initializeData() {
    try {
      await this.createInitialAdmin();

      console.log("Storage initialized successfully");
    } catch (error) {
      console.error("Error initializing storage:", error);
    }
  }

  private async createInitialAdmin() {
    // Check if admin user already exists
    const usersArray = Array.from(this.users.values());
    const adminExists = usersArray.some(user => user.email === 'anuj@synergybrandarchitect.in');
    
    if (!adminExists) {
      try {
        const id = ++this.lastUserId;
        const hashedPassword = bcrypt.hashSync('Anuj@1234', 10);
        
        const now = new Date();
        const user: User = {
          id,
          name: 'Anuj',
          email: 'anuj@synergybrandarchitect.in',
          phone: null,
          website: null,
          password: hashedPassword,
          role: 'admin',
          permissions: ['view', 'create', 'edit', 'delete', 'manage_users'],
          createdAt: now,
          updatedAt: now
        };
        
        this.users.set(id, user);
        console.log('Initial admin user created');
      } catch (error) {
        console.error('Error creating initial admin:', error);
      }
    }
  }





  // User methods
  async createUser(userData: InsertUser): Promise<User> {
    const id = ++this.lastUserId;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    const now = new Date();
    const user: User = {
      id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone || null,
      website: userData.website || null,
      password: hashedPassword,
      role: userData.role || 'client',
      permissions: userData.permissions ? [...userData.permissions] : ['view'],
      createdAt: now,
      updatedAt: now
    };
    
    this.users.set(id, user);
    return { ...user };
  }

  async getUser(id: number): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      return { ...user };
    }
    return undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const usersArray = Array.from(this.users.values());
    for (const user of usersArray) {
      if (user.email.toLowerCase() === email.toLowerCase()) {
        return { ...user };
      }
    }
    return undefined;
  }

  async updateUser(id: number, userData: UpdateUser): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      const updatedUser: User = {
        ...user,
        ...userData,
        id,
        permissions: userData.permissions ? [...userData.permissions] : user.permissions,
        updatedAt: new Date()
      };
      this.users.set(id, updatedUser);
      return { ...updatedUser };
    }
    return undefined;
  }

  async listUsers(): Promise<User[]> {
    return Array.from(this.users.values()).map(user => ({ ...user }));
  }

  async deleteUser(id: number): Promise<boolean> {
    return this.users.delete(id);
  }

  async validateUserCredentials(email: string, password: string): Promise<User | null> {
    const user = await this.getUserByEmail(email);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }









  // Submission methods
  async createSubmission(data: any): Promise<any> {
    const id = ++this.lastSubmissionId;
    const now = new Date();
    const submission = {
      id,
      ...data,
      createdAt: now,
      updatedAt: now
    };
    
    this.submissions.set(id, submission);
    return { ...submission };
  }

  async listSubmissions(filters?: any): Promise<any[]> {
    let list = Array.from(this.submissions.values());
    if (filters?.status) {
      list = list.filter(s => s.status === filters.status);
    }
    return list.map(submission => ({ ...submission }));
  }

  async getSubmission(id: number): Promise<any | undefined> {
    return this.submissions.get(id);
  }

  async updateSubmission(id: number, data: any): Promise<any> {
    const submission = this.submissions.get(id);
    if (submission) {
      const updatedSubmission = {
        ...submission,
        ...data,
        id,
        updatedAt: new Date()
      };
      this.submissions.set(id, updatedSubmission);
      return { ...updatedSubmission };
    }
    return undefined;
  }

  async deleteSubmission(id: number): Promise<boolean> {
    return this.submissions.delete(id);
  }

  // Note methods
  async getSubmissionNotes(submissionId: number): Promise<any[]> {
    return this.notes.get(submissionId) || [];
  }

  async addNote(data: any): Promise<any> {
    const id = ++this.lastNoteId;
    const now = new Date();
    const note = { id, ...data, createdAt: now };
    
    const submissionNotes = this.notes.get(data.submissionId) || [];
    submissionNotes.push(note);
    this.notes.set(data.submissionId, submissionNotes);
    return note;
  }

  // Audit methods
  async logAudit(data: any): Promise<void> {
    console.log('Audit log:', data);
  }

  // Auth/Password methods
  async createPasswordResetToken(userId: number): Promise<string> {
    const token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour expiry
    
    this.resetTokens.set(token, { userId, expiresAt, used: false });
    return token;
  }

  async validateResetToken(token: string): Promise<User | undefined> {
    const data = this.resetTokens.get(token);
    if (!data || data.used || data.expiresAt < new Date()) {
      return undefined;
    }
    return this.getUser(data.userId);
  }

  async markResetTokenAsUsed(token: string): Promise<void> {
    const data = this.resetTokens.get(token);
    if (data) {
      data.used = true;
      this.resetTokens.set(token, data);
    }
  }

  async createOTP(userId: number, email: string): Promise<string> {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 10); // 10 mins expiry
    
    this.otps.set(email, { userId, code, expiresAt, used: false });
    return code;
  }

  async validateOTP(email: string, otp: string): Promise<User | undefined> {
    const data = this.otps.get(email);
    if (!data || data.used || data.code !== otp || data.expiresAt < new Date()) {
      return undefined;
    }
    return this.getUser(data.userId);
  }

  async markOTPAsUsed(email: string, otp: string): Promise<void> {
    const data = this.otps.get(email);
    if (data) {
      data.used = true;
      this.otps.set(email, data);
    }
  }

  // Blog methods
  async createBlog(blogData: InsertBlog): Promise<Blog> {
    const id = ++this.lastBlogId;
    const now = new Date();
    const blog: Blog = {
      id,
      title: blogData.title,
      slug: blogData.slug,
      content: blogData.content,
      status: blogData.status || 'draft',
      publishedAt: blogData.status === 'published' ? now : null,
      createdAt: now,
      updatedAt: now,
      authorId: blogData.authorId || null,
      excerpt: blogData.excerpt || null,
      coverImage: blogData.coverImage || null,
      category: blogData.category || null,
      metaTitle: blogData.metaTitle || null,
      metaDescription: blogData.metaDescription || null,
      metaKeywords: blogData.metaKeywords || null
    };
    
    this.blogs.set(id, blog);
    return { ...blog };
  }

  async getBlog(id: number): Promise<Blog | undefined> {
    const blog = this.blogs.get(id);
    return blog ? { ...blog } : undefined;
  }

  async getBlogBySlug(slug: string): Promise<Blog | undefined> {
    const blogsRaw = Array.from(this.blogs.values());
    const blog = blogsRaw.find(b => b.slug === slug);
    return blog ? { ...blog } : undefined;
  }

  async updateBlog(id: number, blogData: UpdateBlog): Promise<Blog | undefined> {
    const blog = this.blogs.get(id);
    if (!blog) return undefined;

    const now = new Date();
    const updatedBlog: Blog = {
      ...blog,
      ...blogData,
      id,
      updatedAt: now,
      publishedAt: (blogData.status === 'published' && blog.status !== 'published') ? now : blog.publishedAt
    };
    
    this.blogs.set(id, updatedBlog);
    return { ...updatedBlog };
  }

  async deleteBlog(id: number): Promise<boolean> {
    return this.blogs.delete(id);
  }

  async listBlogs(filters?: { status?: string }): Promise<Blog[]> {
    let list = Array.from(this.blogs.values());
    if (filters?.status) {
      list = list.filter(b => b.status === filters.status);
    }
    return list.map(b => ({ ...b }));
  }
}

export const storage = new MemStorage();