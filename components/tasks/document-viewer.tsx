"use client";

import { useState } from "react";
import type { Attachment } from "@/types";
import {
  FileText,
  FileCode,
  FileSpreadsheet,
  FilePieChart,
  File,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DocumentViewerProps {
  attachment: Attachment;
}

export function DocumentViewer({ attachment }: DocumentViewerProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Déterminer le type de fichier à partir de l'extension ou du nom
  const getFileType = (filename: string): string => {
    const extension = filename.split(".").pop()?.toLowerCase() || "";

    // Images
    if (["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) {
      return "image";
    }
    // PDF
    else if (extension === "pdf") {
      return "pdf";
    }
    // Documents texte
    else if (["doc", "docx", "txt", "rtf"].includes(extension)) {
      return "document";
    }
    // Feuilles de calcul
    else if (["xls", "xlsx", "csv"].includes(extension)) {
      return "spreadsheet";
    }
    // Présentations
    else if (["ppt", "pptx"].includes(extension)) {
      return "presentation";
    }
    // Code
    else if (
      [
        "js",
        "jsx",
        "ts",
        "tsx",
        "html",
        "css",
        "json",
        "py",
        "java",
        "c",
        "cpp",
      ].includes(extension)
    ) {
      return "code";
    }
    // Autres
    return "other";
  };

  const fileType = getFileType(attachment.nom);

  // Fonction pour télécharger le fichier
  const handleDownload = () => {
    // Créer un élément a temporaire pour déclencher le téléchargement
    const link = document.createElement("a");
    link.href = attachment.url;
    link.download = attachment.nom; // Définir le nom du fichier téléchargé
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Rendu du contenu selon le type de fichier
  const renderContent = () => {
    // Utilise toujours l'URL relative du backend (ex: /attachments/...)
    const fileUrl = attachment.url?.startsWith("/attachments/")
      ? attachment.url
      : undefined;
    switch (fileType) {
      case "image":
        return (
          <div
            className={`flex justify-center ${
              isExpanded ? "h-[500px]" : "h-[200px]"
            }`}
          >
            <img
              src={fileUrl || "/placeholder.svg"}
              alt={attachment.nom}
              className="max-h-full object-contain"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg?height=200&width=200";
              }}
            />
          </div>
        );
      case "pdf":
        return (
          <div className={`w-full ${isExpanded ? "h-[500px]" : "h-[300px]"}`}>
            {fileUrl ? (
              <iframe
                src={`${fileUrl}#toolbar=0`}
                className="w-full h-full border-0"
                title={attachment.nom}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                Aucun PDF à afficher
              </div>
            )}
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center py-6 bg-muted/30">
            {fileType === "document" && (
              <FileText className="h-12 w-12 text-muted-foreground mb-2" />
            )}
            {fileType === "spreadsheet" && (
              <FileSpreadsheet className="h-12 w-12 text-muted-foreground mb-2" />
            )}
            {fileType === "presentation" && (
              <FilePieChart className="h-12 w-12 text-muted-foreground mb-2" />
            )}
            {fileType === "code" && (
              <FileCode className="h-12 w-12 text-muted-foreground mb-2" />
            )}
            {fileType === "other" && (
              <File className="h-12 w-12 text-muted-foreground mb-2" />
            )}
            <p className="text-sm text-muted-foreground">
              Aperçu non disponible pour ce type de fichier
            </p>
            {fileUrl && (
              <a
                href={fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline text-sm mt-2"
              >
                Ouvrir dans un nouvel onglet
              </a>
            )}
          </div>
        );
    }
  };

  return (
    <div className="space-y-2">
      <div className="bg-muted/20 p-2 rounded-md">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium">{attachment.nom}</h3>
        </div>
        {renderContent()}
      </div>

      {/* Boutons d'action */}
      <div className="flex justify-end gap-2">
        {/* Bouton de téléchargement pour tous les types de fichiers */}
        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Télécharger
        </Button>

        {/* Bouton pour agrandir/réduire l'aperçu (uniquement pour images et PDF) */}
        {(fileType === "image" || fileType === "pdf") && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Réduire" : "Agrandir"}
          </Button>
        )}
      </div>
    </div>
  );
}
