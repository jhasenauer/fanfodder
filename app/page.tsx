import FeedList from "@/components/FeedList";

export default function Page() {
  return (
    <div className="grid grid-cols-3 gap-6">
      <aside className="col-span-1">
        {/* left: subscriptions */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-semibold mb-2">Subscriptions</h3>
          <div>-- subscription list component (left as exercise) --</div>
        </div>
      </aside>

      <section className="col-span-2">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">Latest</h2>
          <FeedList />
        </div>
      </section>
    </div>
  );
}
