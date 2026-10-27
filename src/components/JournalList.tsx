import { Link } from "react-router-dom";
import projectsData from "../data/projects.json";
import { formatDate } from "../lib/format";
import { journalTypeMeta } from "../lib/status";
import type { JournalEntry, Project } from "../types";

const projects = projectsData as Project[];

type JournalListProps = {
  entries: JournalEntry[];
};

const JournalList = ({ entries }: JournalListProps) => {
  return (
    <ol className="relative space-y-6 border-l border-line pl-6">
      {entries.map((entry) => {
        const meta = journalTypeMeta[entry.type];
        const project = projects.find((p) => p.id === entry.projectId);
        return (
          <li key={`${entry.date}-${entry.title}`} className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-page bg-accent"
            />
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              <time dateTime={entry.date} className="font-semibold text-body">
                {formatDate(entry.date)}
              </time>
              <span className={`font-medium ${meta.className}`}>{meta.label}</span>
              {project && (
                <Link to={`/projects/${project.id}`} className="text-subtle hover:text-fg">
                  {project.title}
                </Link>
              )}
            </div>
            <h3 className="mt-1 text-base font-semibold text-fg">{entry.title}</h3>
            <p className="mt-1 max-w-3xl text-sm leading-relaxed text-body">{entry.text}</p>
          </li>
        );
      })}
    </ol>
  );
};

export default JournalList;
