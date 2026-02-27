import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DomainRatingProps {
  domain: string;
  className?: string;
}

// Mock data - 模擬評分資料
const getMockRating = (domain: string) => {
  const hash = domain.split("").reduce((a, b) => a + b.charCodeAt(0), 0);
  return {
    averageRating: 3.5 + (hash % 15) / 10,
    totalRatings: 50 + (hash % 200),
    userRating: null as number | null, // 使用者尚未評分
  };
};

export function DomainRating({ domain, className }: DomainRatingProps) {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [isLoggedIn] = useState(false); // 示範用，預設未登入

  const mockData = getMockRating(domain);
  const displayRating = userRating ?? mockData.averageRating;
  const totalRatings = mockData.totalRatings + (userRating ? 1 : 0);

  const handleStarClick = (rating: number) => {
    if (!isLoggedIn) {
      setShowLoginDialog(true);
      return;
    }
    setUserRating(rating);
  };

  const renderStars = (rating: number, interactive: boolean = false) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => {
          const filled = interactive
            ? star <= (hoverRating || userRating || 0)
            : star <= Math.round(rating);
          const halfFilled = !interactive && star === Math.ceil(rating) && rating % 1 >= 0.3 && rating % 1 < 0.8;

          return (
            <button
              key={star}
              type="button"
              className={cn(
                "transition-all duration-150",
                interactive && "hover:scale-110 cursor-pointer",
                !interactive && "cursor-default"
              )}
              onMouseEnter={() => interactive && setHoverRating(star)}
              onMouseLeave={() => interactive && setHoverRating(0)}
              onClick={() => interactive && handleStarClick(star)}
              disabled={!interactive}
            >
              <Star
                className={cn(
                  "w-5 h-5 transition-colors",
                  filled
                    ? "fill-yellow-400 text-yellow-400"
                    : halfFilled
                    ? "fill-yellow-400/50 text-yellow-400"
                    : "fill-transparent text-muted-foreground/40"
                )}
              />
            </button>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className={cn("flex flex-col gap-2", className)}>
        {/* 平均評分顯示 */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            {renderStars(displayRating)}
            <span className="text-lg font-semibold text-foreground">
              {displayRating.toFixed(1)}
            </span>
          </div>
          <span className="text-sm text-muted-foreground">
            ({totalRatings.toLocaleString()} 則評分)
          </span>
        </div>

        {/* 使用者評分區 */}
        <div className="flex items-center gap-3 pt-2 border-t border-border/50">
          {userRating ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">你的評分:</span>
              {renderStars(userRating)}
              <Button
                variant="ghost"
                size="sm"
                className="text-xs h-6 px-2"
                onClick={() => setUserRating(null)}
              >
                重新評分
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">評分此網站:</span>
              {renderStars(0, true)}
              {!isLoggedIn && (
                <span className="text-xs text-muted-foreground/70">
                  (需登入)
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 登入提示 Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
              需要登入才能評分
            </DialogTitle>
            <DialogDescription className="text-left space-y-3 pt-2">
              <p>
                登入後即可為網站評分，幫助其他使用者了解網站品質。
              </p>
              <div className="flex gap-2 pt-2">
                <Button 
                  className="flex-1"
                  onClick={() => setShowLoginDialog(false)}
                >
                  登入 / 註冊
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowLoginDialog(false)}
                >
                  稍後再說
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
