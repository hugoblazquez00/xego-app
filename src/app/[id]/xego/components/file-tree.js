import { File, Folder, Tree } from "@/components/ui/file-tree";

export function FileTree({ onSelect }) {
  return (
    <div className="relative flex h-[300px] w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <Tree
        className="overflow-hidden rounded-md bg-background p-2"
        initialSelectedId="7"
        initialExpandedItems={[
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
        ]}
        elements={ELEMENTS}
      >
        <Folder element="src" value="1">
          <Folder value="2" element="app">
            <File value="3" onClick={() => onSelect("layout.js")}>
              <p>layout.js</p>
            </File>
            <File value="4" onClick={() => onSelect("page.js")}>
              <p>page.js</p>
            </File>
          </Folder>
          <Folder value="5" element="components">
            <Folder value="6" element="ui">
              <File value="7" onClick={() => onSelect("button.js")}>
                <p>button.js</p>
              </File>
            </Folder>
            <File value="8" onClick={() => onSelect("header.js")}>
              <p>header.js</p>
            </File>
            <File value="9" onClick={() => onSelect("footer.js")}>
              <p>footer.js</p>
            </File>
          </Folder>
          <Folder value="10" element="lib">
            <File value="11" onClick={() => onSelect("utils.js")}>
              <p>utils.js</p>
            </File>
          </Folder>
        </Folder>
      </Tree>
    </div>
  );
}

const ELEMENTS = [
  {
    id: "1",
    type: "folder",
    name: "src",
    children: [
      {
        id: "2",
        type: "folder",
        name: "app",
        children: [
          {
            id: "3",
            type: "file",
            name: "layout.js",
          },
          {
            id: "4",
            type: "file",
            name: "page.js",
          },
        ],
      },
      {
        id: "5",
        type: "folder",
        name: "components",
        children: [
          {
            id: "6",
            type: "folder",
            name: "ui",
            children: [
              {
                id: "7",
                type: "file",
                name: "button.js",
              },
            ],
          },
          {
            id: "8",
            type: "file",
            name: "header.js",
          },
          {
            id: "9",
            type: "file",
            name: "footer.js",
          },
        ],
      },
      {
        id: "10",
        type: "folder",
        name: "lib",
        children: [
          {
            id: "11",
            type: "file",
            name: "utils.js",
          },
        ],
      },
    ],
  },
];
