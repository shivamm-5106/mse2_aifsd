import { useState, useEffect } from 'react';

const ItemForm = ({ initialData = {}, onSubmit, submitLabel = 'Submit', loading = false }) => {
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    type: 'Lost',
    location: '',
    date: '',
    contactInfo: '',
  });

  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      setFormData({
        itemName: initialData.itemName || '',
        description: initialData.description || '',
        type: initialData.type || 'Lost',
        location: initialData.location || '',
        date: initialData.date ? new Date(initialData.date).toISOString().split('T')[0] : '',
        contactInfo: initialData.contactInfo || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Item Name */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="itemName">
          Item Name <span className="text-rose-400">*</span>
        </label>
        <input
          type="text"
          id="itemName"
          name="itemName"
          value={formData.itemName}
          onChange={handleChange}
          className="input-glass"
          placeholder="e.g. Blue Backpack"
          required
        />
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="type">
          Type <span className="text-rose-400">*</span>
        </label>
        <div className="flex gap-3">
          <label
            className={`flex-1 text-center py-3 rounded-xl cursor-pointer transition-all font-medium text-sm border ${
              formData.type === 'Lost'
                ? 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600'
            }`}
          >
            <input
              type="radio"
              name="type"
              value="Lost"
              checked={formData.type === 'Lost'}
              onChange={handleChange}
              className="sr-only"
            />
            🔴 Lost
          </label>
          <label
            className={`flex-1 text-center py-3 rounded-xl cursor-pointer transition-all font-medium text-sm border ${
              formData.type === 'Found'
                ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400'
                : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:border-slate-600'
            }`}
          >
            <input
              type="radio"
              name="type"
              value="Found"
              checked={formData.type === 'Found'}
              onChange={handleChange}
              className="sr-only"
            />
            🟢 Found
          </label>
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input-glass min-h-[100px] resize-y"
          placeholder="Describe the item in detail..."
          rows={3}
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="location">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="input-glass"
          placeholder="Where was it lost/found?"
        />
      </div>

      {/* Date */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="input-glass"
        />
      </div>

      {/* Contact Info */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="contactInfo">
          Contact Info
        </label>
        <input
          type="text"
          id="contactInfo"
          name="contactInfo"
          value={formData.contactInfo}
          onChange={handleChange}
          className="input-glass"
          placeholder="Phone, email, or other contact..."
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="btn-gradient w-full py-3"
        disabled={loading}
        id="item-form-submit"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            Processing...
          </span>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
};

export default ItemForm;
