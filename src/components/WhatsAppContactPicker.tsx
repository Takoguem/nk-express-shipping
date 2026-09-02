import { MessageCircle } from "lucide-react";
import type { Language, WhatsAppContact } from "../types/site";
import { createWhatsAppLink } from "../utils";

interface WhatsAppContactPickerProps {
  contacts: WhatsAppContact[];
  heading: string;
  messageForLanguage: (language: Language) => string;
  emptyText: string;
}

/** Affiche les seuls contacts autorisés et applique la langue propre à chacun. */
export function WhatsAppContactPicker({
  contacts,
  heading,
  messageForLanguage,
  emptyText,
}: WhatsAppContactPickerProps) {
  if (!contacts.length) return <p className="contact-picker__empty">{emptyText}</p>;

  return (
    <div className="contact-picker" role="group" aria-label={heading}>
      <strong className="contact-picker__title">{heading}</strong>
      <div className="contact-picker__grid">
        {contacts.map((contact) => {
          const link = createWhatsAppLink(
            contact.phone,
            messageForLanguage(contact.whatsappLanguage),
            contact.whatsappLanguage,
          );
          if (!link) return null;

          return (
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              key={contact.id}
              aria-label={`${heading} — ${contact.label}, ${contact.phone}`}
            >
              <MessageCircle aria-hidden="true" size={18} />
              <span>
                <b>{contact.label}</b>
                <small>{contact.phone}</small>
              </span>
              <em>{contact.whatsappLanguage.toUpperCase()}</em>
            </a>
          );
        })}
      </div>
    </div>
  );
}
