import { Download, Eye, Heart } from "lucide-react";

const LayoutStorage = () => {
  const styles = [
    {
      id: 1,
      name: "Modern Blog",
      author: "David",
      category: "blog",
      likes: 234,
      downloads: 89,
      views: 1205,
      preview: {
        h1: "text-amber-200 text-2xl font-bold",
        p: "text-gray-300 leading-relaxed",
      },
    },
    // Více stylů by bylo zde...
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {/* Style Card */}
      {styles.map((style) => (
        <div
          key={style.id}
          className="bg-slate-800 rounded overflow-hidden border border-slate-700"
        >
          {/* Preview */}
          <div className="p-4 bg-slate-900">
            <h3 className={style.preview.h1}>Heading</h3>
            <p className={style.preview.p}>Preview text example</p>
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="mb-3">
              <h4 className="text-amber-200 font-medium">{style.name}</h4>
              <p className="text-gray-400 text-sm">by {style.author}</p>
            </div>

            {/* Stats */}
            <div className="flex justify-between items-center">
              <div className="flex gap-3 text-gray-400 text-sm">
                <span className="flex items-center gap-1">
                  <Heart size={14} />
                  {style.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Download size={14} />
                  {style.downloads}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={14} />
                  {style.views}
                </span>
              </div>
              <button className="p-2 text-amber-400 hover:bg-slate-700 rounded transition-colors">
                <Download size={18} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LayoutStorage;
