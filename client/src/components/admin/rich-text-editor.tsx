import { useEditor, EditorContent } from '@tiptap/react';
import { StarterKit } from '@tiptap/starter-kit';
import { Table } from '@tiptap/extension-table';
import { TableRow } from '@tiptap/extension-table-row';
import { TableHeader } from '@tiptap/extension-table-header';
import { TableCell } from '@tiptap/extension-table-cell';
import { Link } from '@tiptap/extension-link';
import { Image } from '@tiptap/extension-image';
import { Youtube } from '@tiptap/extension-youtube';
import { Placeholder } from '@tiptap/extension-placeholder';
import { TextAlign } from '@tiptap/extension-text-align';
import { Underline } from '@tiptap/extension-underline';
import { Highlight } from '@tiptap/extension-highlight';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { CharacterCount } from '@tiptap/extension-character-count';
import { forwardRef, useImperativeHandle, useEffect } from 'react';
import { 
  Bold, Italic, Underline as UnderlineIcon, 
  List, ListOrdered, AlignLeft, AlignCenter, 
  AlignRight, Link as LinkIcon, Image as ImageIcon,
  Table as TableIcon, Trash2, Plus, 
  Heading1, Heading2, Heading3, Code,
  Quote, Redo, Undo, Eraser, Youtube as YoutubeIcon,
  CheckSquare, Highlighter, ArrowUp, ArrowDown,
  Columns, Rows, Grid2X2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor = forwardRef<any, RichTextEditorProps>(
  ({ value, onChange, placeholder = "Start typing protocol..." }, ref) => {
    const editor = useEditor({
      extensions: [
        StarterKit,
        Underline,
        Highlight,
        Link.configure({ openOnClick: false }),
        Image.configure({ allowBase64: true }),
        Youtube,
        TextAlign.configure({ types: ['heading', 'paragraph'] }),
        TaskList,
        TaskItem.configure({ nested: true }),
        Table.configure({ resizable: true }),
        TableRow,
        TableHeader,
        TableCell,
        Placeholder.configure({ placeholder }),
        CharacterCount,
      ],
      content: value,
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
    });

    // Handle initial value and updates from parent
    useEffect(() => {
      if (editor && value !== editor.getHTML()) {
        editor.commands.setContent(value);
      }
    }, [value, editor]);

    useImperativeHandle(ref, () => ({
      focus: () => editor?.chain().focus().run(),
      getHTML: () => editor?.getHTML(),
      setHTML: (content: string) => editor?.commands.setContent(content),
    }));

    if (!editor) return null;

    const MenuButton = ({ 
      onClick, 
      isActive = false, 
      disabled = false, 
      children, 
      tooltip 
    }: { 
      onClick: () => void; 
      isActive?: boolean; 
      disabled?: boolean; 
      children: React.ReactNode;
      tooltip: string;
    }) => (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onClick}
              disabled={disabled}
              className={cn(
                "h-8 w-8 p-0 rounded-md transition-all",
                isActive ? "bg-orange-100 text-[#FF6B00] shadow-sm" : "text-gray-500 hover:bg-gray-100"
              )}
            >
              {children}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="bg-gray-800 text-white border-none text-[10px] uppercase font-bold tracking-wider">
            {tooltip}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );

    return (
      <div className="flex flex-col w-full h-full border rounded-xl bg-white overflow-hidden shadow-sm group focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-200 transition-all duration-300">
        {/* Advanced Management Hub - Refined for Single Row */}
        <div className="flex flex-nowrap items-center gap-1 p-2 bg-gray-50/50 border-b border-gray-100 sticky top-0 z-20 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-1 pr-2 border-r border-gray-200">
            <MenuButton onClick={() => editor.chain().focus().toggleBold().run()} isActive={editor.isActive('bold')} tooltip="Bold (Ctrl+B)"><Bold size={16} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleItalic().run()} isActive={editor.isActive('italic')} tooltip="Italic (Ctrl+I)"><Italic size={16} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleUnderline().run()} isActive={editor.isActive('underline')} tooltip="Underline (Ctrl+U)"><UnderlineIcon size={16} /></MenuButton>
          </div>

          <div className="flex items-center gap-1 px-2 border-r border-gray-200">
            <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} isActive={editor.isActive('heading', { level: 1 })} tooltip="Heading 1"><Heading1 size={16} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} isActive={editor.isActive('heading', { level: 2 })} tooltip="Heading 2"><Heading2 size={16} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} isActive={editor.isActive('heading', { level: 3 })} tooltip="Heading 3"><Heading3 size={16} /></MenuButton>
          </div>

          <div className="flex items-center gap-1 px-2 border-r border-gray-200">
            <MenuButton onClick={() => editor.chain().focus().toggleBulletList().run()} isActive={editor.isActive('bulletList')} tooltip="Bullet List"><List size={16} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleOrderedList().run()} isActive={editor.isActive('orderedList')} tooltip="Ordered List"><ListOrdered size={16} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleTaskList().run()} isActive={editor.isActive('taskList')} tooltip="Task List"><CheckSquare size={16} /></MenuButton>
          </div>

          <div className="flex items-center gap-1 px-2 border-r border-gray-200">
            <MenuButton onClick={() => editor.chain().focus().setTextAlign('left').run()} isActive={editor.isActive({ textAlign: 'left' })} tooltip="Align Left"><AlignLeft size={16} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().setTextAlign('center').run()} isActive={editor.isActive({ textAlign: 'center' })} tooltip="Align Center"><AlignCenter size={16} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().setTextAlign('right').run()} isActive={editor.isActive({ textAlign: 'right' })} tooltip="Align Right"><AlignRight size={16} /></MenuButton>
          </div>

          <div className="flex items-center gap-1 px-2 border-r border-gray-200">
            <MenuButton onClick={() => editor.chain().focus().toggleBlockquote().run()} isActive={editor.isActive('blockquote')} tooltip="Blockquote"><Quote size={16} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleCodeBlock().run()} isActive={editor.isActive('codeBlock')} tooltip="Code Block"><Code size={16} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().toggleHighlight().run()} isActive={editor.isActive('highlight')} tooltip="Highlight"><Highlighter size={16} /></MenuButton>
          </div>

          <div className="flex items-center gap-1 px-2 border-r border-gray-200">
            <MenuButton onClick={() => {
              const url = window.prompt('URL');
              if (url) editor.chain().focus().setLink({ href: url }).run();
            }} isActive={editor.isActive('link')} tooltip="Insert Link"><LinkIcon size={16} /></MenuButton>
            <MenuButton onClick={() => {
              const url = window.prompt('Image URL');
              if (url) editor.chain().focus().setImage({ src: url }).run();
            }} tooltip="Insert Image"><ImageIcon size={16} /></MenuButton>
            <MenuButton onClick={() => {
              const url = window.prompt('YouTube URL');
              if (url) editor.chain().focus().setYoutubeVideo({ src: url }).run();
            }} tooltip="Insert YouTube"><YoutubeIcon size={16} /></MenuButton>
          </div>

          <div className="flex items-center gap-1 px-2 border-r border-gray-200">
            <MenuButton onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} tooltip="Insert Table"><TableIcon size={16} /></MenuButton>
            {editor.isActive('table') && (
              <>
                <MenuButton onClick={() => editor.chain().focus().addColumnBefore().run()} tooltip="Add Column Left"><Plus size={16} className="rotate-90" /></MenuButton>
                <MenuButton onClick={() => editor.chain().focus().addColumnAfter().run()} tooltip="Add Column Right"><Plus size={16} /></MenuButton>
                <MenuButton onClick={() => editor.chain().focus().addRowBefore().run()} tooltip="Add Row Above"><ArrowUp size={16} /></MenuButton>
                <MenuButton onClick={() => editor.chain().focus().addRowAfter().run()} tooltip="Add Row Below"><ArrowDown size={16} /></MenuButton>
                <MenuButton onClick={() => editor.chain().focus().deleteColumn().run()} tooltip="Delete Column"><Columns size={16} className="text-red-400" /></MenuButton>
                <MenuButton onClick={() => editor.chain().focus().deleteRow().run()} tooltip="Delete Row"><Rows size={16} className="text-red-400" /></MenuButton>
                <MenuButton onClick={() => editor.chain().focus().deleteTable().run()} tooltip="Delete Table"><Trash2 size={16} className="text-red-400" /></MenuButton>
              </>
            )}
          </div>

          <div className="ml-auto flex items-center gap-1 pl-2 border-l border-gray-200">
            <MenuButton onClick={() => editor.chain().focus().undo().run()} tooltip="Undo"><Undo size={16} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().redo().run()} tooltip="Redo"><Redo size={16} /></MenuButton>
            <MenuButton onClick={() => editor.chain().focus().unsetAllMarks().run()} tooltip="Clear Formatting"><Eraser size={16} /></MenuButton>
          </div>
        </div>



        {/* Execution Surface */}
        <div 
          className="flex-1 overflow-y-auto min-h-0 custom-editor-scrollbar"
          data-lenis-prevent
        >
          <EditorContent editor={editor} spellCheck={false} />
        </div>

        {/* Tactical Info Protocol */}
        <div className="bg-gray-50/50 p-2 border-t border-gray-100 flex items-center justify-between text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 italic">
          <div className="flex items-center gap-4">
            <span>Tiptap Engine 3.0</span>
            <span className="flex items-center gap-1"><Grid2X2 size={10} /> Table Support Active</span>
          </div>
          <div className="flex items-center gap-4">
            <span>{editor.storage.characterCount?.characters?.() || 0} Characters</span>
            <span>{editor.storage.characterCount?.words?.() || 0} Words</span>
          </div>
        </div>
      </div>
    );
  }
);

RichTextEditor.displayName = 'RichTextEditor';

export default RichTextEditor;