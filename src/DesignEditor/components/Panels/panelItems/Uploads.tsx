import React from "react";
import { Block } from "baseui/block";
import Scrollable from "~/components/Scrollable";
import { Button, SIZE } from "baseui/button";
import DropZone from "~/components/Dropzone";
import { nanoid } from "nanoid";
import { captureFrame, loadVideoResource } from "~/utils/video";
import { toBase64 } from "~/utils/data";
import useGraphic from "~/hooks/useGraphic";

interface uploadProps {
  type: string;
  btnText: string;
}

export default function ({ type = "StaticImage", btnText = "Computer" }: uploadProps) {
  const inputFileRef = React.useRef<HTMLInputElement>(null);
  const [uploads, setUploads] = React.useState<any[]>([]);
  const { addCanvasObject } = useGraphic();
  /* File Drop Handler */
  const handleDropFiles = async (files: FileList) => {
    const file = files[0];

    const isVideo = file.type.includes("video");
    const base64 = (await toBase64(file)) as string;
    let preview = base64;
    if (isVideo) {
      const video = await loadVideoResource(base64);
      const frame = await captureFrame(video);
      preview = frame;
    }
    const upload = {
      id: nanoid(),
      src: base64,
      preview: preview,
      type: type,
    };

    setUploads([...uploads, upload]);
  };
  /* File INput Box Click Handler */
  const handleInputFileRefClick = () => {
    inputFileRef.current?.click();
  };

  return (
    <DropZone handleDropFiles={handleDropFiles}>
      <div style={{ width: "100%", padding: "1rem" }}>
        <>
          <Button
            onClick={handleInputFileRefClick}
            size={SIZE.compact}
            overrides={{
              Root: {
                style: {
                  width: "100%",
                  position: "sticky",
                  top: 0,
                },
              },
            }}>
            {btnText}
          </Button>
          <input onChange={(e) => handleDropFiles(e.target.files!)} type="file" id="file" ref={inputFileRef} style={{ display: "none" }} />
          <div
            style={{
              marginTop: "1rem",
              display: "grid",
              gap: "8px",
              gridTemplateColumns: "1fr 1fr",
            }}>
            {uploads.map((upload) => (
              <div
                key={upload.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => addCanvasObject(upload.src, type)}>
                <div>
                  <img width="100%" style={{ objectFit: "contain", maxHeight: "150px" }} src={upload.preview ? upload.preview : upload.url} alt="preview" />
                </div>
              </div>
            ))}
          </div>
        </>
      </div>
    </DropZone>
  );
}
