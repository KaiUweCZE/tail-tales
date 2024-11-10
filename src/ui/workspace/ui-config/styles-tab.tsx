import { DefaultConfiguration, HtmlElements } from "@/app/setting/types";

type StylesTabProps = {
  userConfig: HtmlElements;
};

const StylesTab = ({ userConfig }: StylesTabProps) => {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Element Styles</h2>
      <div className="grid gap-2">
        {userConfig &&
          Object.entries(userConfig).map(([elementType, config]) => (
            <div
              key={elementType}
              className="grid border-b pb-2 border-slate-700"
            >
              <span className="text-amber-200 font-medium mb-2">
                {elementType}
              </span>
              <div className="grid text-sm">
                <div className="flex">
                  <span className="text-slate-400">Base class:</span>
                  <code className="ml-2 px-1 bg-slate-700 rounded">
                    {config.className}
                  </code>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StylesTab;

/*{config.variants && (
  <div>
    <span className="text-slate-400">Variants:</span>
    <div className="ml-2 space-y-1">
      {userConfig &&
        Object.entries(config.variants).map(([name, value]) => (
          <div key={name}>
            <span className="text-amber-400">{name}:</span>
            <code className="ml-2 px-1 bg-slate-700 rounded">
              co?
            </code>
          </div>
        ))}
    </div>
  </div>
)}*/
