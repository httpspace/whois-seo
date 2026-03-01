'use client'

import { AppLayout } from "@/components/layout/AppLayout";
import { Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/lib/router-compat";

export default function SavedDomains() {
  return (
    <AppLayout>
      <div className="container py-6 space-y-6 max-w-3xl">
        <header className="space-y-1">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-bold text-foreground">Saved Domains</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Your bookmarked domains for quick access.
          </p>
        </header>

        <div className="text-center py-16 space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto">
            <Bookmark className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="font-semibold text-foreground">No saved domains yet</h2>
            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
              Save domains you're interested in by clicking the bookmark icon on any domain page.
            </p>
          </div>
          <Link href="/">
            <Button variant="outline">Browse Trending Domains</Button>
          </Link>
        </div>
      </div>
    </AppLayout>
  );
}
