import { Mail, Plus, Trash2 } from "lucide-react";
import { useCvStore } from "../../../core/store/useCvStore";
import { useTranslation } from "react-i18next";

export const FormContacts = () => {
  const { t } = useTranslation("form");
  const { data, updateData } = useCvStore();

  const addContact = () => {
    const newContact = { id: crypto.randomUUID(), label: "Mobile", value: "" };
    updateData({
      personalInfo: {
        ...data.personalInfo,
        contacts: [...(data.personalInfo.contacts || []), newContact],
      },
    });
  };

  const updateContact = (
    id: string,
    field: "label" | "value",
    value: string
  ) => {
    const updated = data.personalInfo.contacts.map((c) =>
      c.id === id ? { ...c, [field]: value } : c
    );
    updateData({ personalInfo: { ...data.personalInfo, contacts: updated } });
  };

  const removeContact = (id: string) => {
    const filtered = data.personalInfo.contacts.filter((c) => c.id !== id);
    updateData({ personalInfo: { ...data.personalInfo, contacts: filtered } });
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
        <div className="flex items-center gap-2">
          <Mail className="text-blue-500" size={20} />
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
             {t("contact.title")}
          </h2>
        </div>
        <button
          onClick={addContact}
          className="text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 p-1 rounded-full transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="space-y-3">
        {data.personalInfo.contacts?.map((contact) => (
          <div
            key={contact.id}
            className="flex gap-2 group animate-in fade-in duration-200"
          >
            <input
              type="text"
              value={contact.label}
              onChange={(e) =>
                updateContact(contact.id, "label", e.target.value)
              }
              className="w-1/3 input-field text-sm font-medium"
              placeholder="Ex: Tel"
            />
            <input
              type="text"
              value={contact.value}
              onChange={(e) =>
                updateContact(contact.id, "value", e.target.value)
              }
              className="flex-1 input-field text-sm"
              placeholder="Ex: +33..."
            />
            <button
              onClick={() => removeContact(contact.id)}
              className="text-slate-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
