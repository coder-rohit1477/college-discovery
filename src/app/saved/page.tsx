import { EmptyState } from "@/features/colleges/components/empty-state";

export default function SavedCollegesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <EmptyState 
        title="Saved Colleges" 
        description="The saved colleges feature is coming soon! You'll be able to bookmark your favorite institutions and access them later." 
        icon="heart"
        actionText="Explore Colleges"
        actionHref="/colleges"
      />
    </div>
  );
}
