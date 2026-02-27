import { useState } from "react";
import { MessageSquare, ThumbsUp, Reply, Send, User } from "lucide-react";
import { SectionCard, SectionHeader } from "@/components/ui/section-card";
import { cn } from "@/lib/utils";

interface Comment {
  id: string;
  author: string;
  avatar?: string;
  content: string;
  date: string;
  likes: number;
  replies?: Comment[];
}

// 模擬留言資料
const mockComments: Comment[] = [
  {
    id: "1",
    author: "域名觀察家",
    content: "這個網域的設計真的很棒，用戶體驗一流。他們的產品更新頻率也很高，值得關注。",
    date: "2 小時前",
    likes: 12,
    replies: [
      {
        id: "1-1",
        author: "科技愛好者",
        content: "同意！他們最近的更新確實帶來了很多改進。",
        date: "1 小時前",
        likes: 3,
      },
    ],
  },
  {
    id: "2",
    author: "網站分析師",
    content: "從技術角度來看，這個網站的 SEO 做得非常好，載入速度也很快。推薦大家參考學習。",
    date: "5 小時前",
    likes: 8,
  },
  {
    id: "3",
    author: "創業者小明",
    content: "有人知道這個網域的估值大概是多少嗎？感覺這個名字很有價值。",
    date: "1 天前",
    likes: 5,
  },
];

export function DomainComments({ domain, className }: { domain: string; className?: string }) {
  const [comments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");
  const [showReplyTo, setShowReplyTo] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    // 這裡之後可以接 API
    setNewComment("");
  };

  return (
    <SectionCard className={className}>
      <SectionHeader 
        title="討論區" 
        action={
          <span className="text-xs text-muted-foreground">{comments.length} 則留言</span>
        }
      />
      
      {/* 留言輸入框 */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <User className="w-4 h-4 text-primary" />
          </div>
          <div className="flex-1 relative">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="分享你對這個網域的看法..."
              className="w-full px-4 py-3 pr-12 rounded-xl bg-muted/50 border border-border/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm resize-none min-h-[80px]"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="absolute bottom-3 right-3 p-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>

      {/* 留言列表 */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="space-y-3">
            <CommentItem 
              comment={comment} 
              onReply={() => setShowReplyTo(comment.id)}
            />
            
            {/* 回覆 */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="ml-12 space-y-3 border-l-2 border-border/40 pl-4">
                {comment.replies.map((reply) => (
                  <CommentItem key={reply.id} comment={reply} isReply />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {comments.length === 0 && (
        <div className="py-8 text-center">
          <MessageSquare className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">還沒有人留言，成為第一個發言的人吧！</p>
        </div>
      )}
    </SectionCard>
  );
}

function CommentItem({ 
  comment, 
  isReply = false,
  onReply 
}: { 
  comment: Comment; 
  isReply?: boolean;
  onReply?: () => void;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <div className="flex items-start gap-3">
      <div className={cn(
        "rounded-full bg-muted flex items-center justify-center shrink-0",
        isReply ? "w-7 h-7" : "w-9 h-9"
      )}>
        <User className={cn("text-muted-foreground", isReply ? "w-3.5 h-3.5" : "w-4 h-4")} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className={cn("font-medium", isReply ? "text-xs" : "text-sm")}>{comment.author}</span>
          <span className="text-xs text-muted-foreground">•</span>
          <span className="text-xs text-muted-foreground">{comment.date}</span>
        </div>
        <p className={cn("text-muted-foreground leading-relaxed", isReply ? "text-xs" : "text-sm")}>
          {comment.content}
        </p>
        <div className="flex items-center gap-4 mt-2">
          <button 
            onClick={() => setLiked(!liked)}
            className={cn(
              "flex items-center gap-1.5 text-xs transition-colors",
              liked ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <ThumbsUp className={cn("w-3.5 h-3.5", liked && "fill-current")} />
            {comment.likes + (liked ? 1 : 0)}
          </button>
          {!isReply && onReply && (
            <button 
              onClick={onReply}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <Reply className="w-3.5 h-3.5" />
              回覆
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
