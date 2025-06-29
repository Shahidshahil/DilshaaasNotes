document.addEventListener('DOMContentLoaded', () => {

    function getFileIcon(fileType) {
        const icons = {
            'pdf': '📄',
            'doc': '📝',
            'docx': '📝',
            'txt': '📄',
            'mp3': '🎵',
            'mp4': '🎬',
            'avi': '🎬',
            'mov': '🎬',
            'jpg': '🖼️',
            'jpeg': '🖼️',
            'png': '🖼️',
            'gif': '🖼️',
            'ppt': '📊',
            'pptx': '📊',
            'xls': '📈',
            'xlsx': '📈'
        };
        return icons[fileType.toLowerCase()] || '📁';
    }

    async function loadNotes() {
        const notesList = document.getElementById("notes-list");

        try {
            const response = await fetch(`notes.json?t=${new Date().getTime()}`);
            if (!response.ok) throw new Error("Network response was not ok");

            const notes = await response.json();

            if (notes.length === 0) {
                notesList.innerHTML = "<div style='grid-column: 1/-1; text-align: center; padding: 2rem;'><p style='font-size: 1.2rem; color: #666;'>No notes have been added yet.</p></div>";
                return;
            }

            notesList.innerHTML = "";

            notes.forEach(note => {
                const noteItem = document.createElement("div");
                noteItem.className = "note-item";

                // Get file extension for icon
                const fileExtension = note.link.split('.').pop() || '';
                const fileIcon = getFileIcon(fileExtension);

                // Create thumbnail
                const thumbnail = document.createElement("div");
                thumbnail.className = "note-thumbnail";

                if (note.thumbnail) {
                    const thumbnailImg = document.createElement("img");
                    thumbnailImg.src = note.thumbnail;
                    thumbnailImg.alt = "Thumbnail";
                    thumbnailImg.style.width = "100%";
                    thumbnailImg.style.height = "100%";
                    thumbnailImg.style.objectFit = "cover";
                    thumbnail.appendChild(thumbnailImg);
                } else {
                    thumbnail.textContent = fileIcon;
                }

                // Create content container
                const noteContent = document.createElement("div");
                noteContent.className = "note-content";

                const noteTitle = document.createElement("div");
                noteTitle.className = "note-title";
                noteTitle.innerHTML = `<strong>${note.title}</strong>`;

                const downloadButton = document.createElement("a");
                downloadButton.href = note.link;
                downloadButton.textContent = "📥 Download Now";
                downloadButton.className = "download-button";
                downloadButton.target = "_blank";
                downloadButton.download = "";

                noteContent.appendChild(noteTitle);
                noteContent.appendChild(downloadButton);

                noteItem.appendChild(thumbnail);
                noteItem.appendChild(noteContent);

                notesList.appendChild(noteItem);
            });

        } catch (error) {
            notesList.innerHTML = "<div style='grid-column: 1/-1; text-align: center; padding: 2rem;'><p style='color: #f44336;'>Could not load notes. Please check back later.</p></div>";
            console.error("Error loading notes:", error);
        }
    }

    loadNotes();
});