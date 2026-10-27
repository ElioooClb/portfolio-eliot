import JournalList from "../components/JournalList";
import journalData from "../data/journal.json";
import type { JournalEntry } from "../types";

const journal = journalData as JournalEntry[];

const Journal = () => {
  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold text-fg">Journal d'avancement</h1>
        <p className="max-w-2xl text-sm leading-relaxed text-body">
          Les réalisations, décisions, tests et incidents résolus, datés, du
          plus récent au plus ancien. Le journal est mis à jour au rythme des
          jalons réels.
        </p>
      </section>
      <JournalList entries={journal} />
    </div>
  );
};

export default Journal;
