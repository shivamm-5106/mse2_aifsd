import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import ItemForm from '../components/ItemForm';

const AddItem = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
    setError('');
    setLoading(true);

    try {
      await API.post('/items', formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create item');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 lg:px-8 py-10">
      <div className="animate-fade-in">

        {/* Header */}
        <div className="mb-10 space-y-1">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Report an Item
          </h1>
          <p className="text-sm text-slate-400">
            Fill in the details of the lost or found item
          </p>
        </div>

        {/* Form Card */}
        <div className="glass-card p-6 sm:p-8 rounded-2xl">
          
          {error && (
            <div className="alert-error mb-6" id="add-item-error">
              {error}
            </div>
          )}

          <ItemForm
            onSubmit={handleSubmit}
            submitLabel="Report Item"
            loading={loading}
          />

        </div>
      </div>
    </div>
  );
};

export default AddItem;