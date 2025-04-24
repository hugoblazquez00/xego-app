import React, { useRef, useEffect } from 'react';
import { ShimmerButton } from "@/components/magicui/shimmer-button"; 
import { Button } from "@/components/ui/button"; 

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, itemType }) => {
  const modalRef = useRef(null);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div ref={modalRef} className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">
          {itemType === 'folder' ? 'Are you sure you want to delete this folder?' : 'Are you sure you want to delete this file?'}
        </h2>
        <div className="flex justify-end gap-2">
          <Button onClick={onConfirm} className="bg-red-500 text-white">
            Confirm
          </Button>
          <ShimmerButton onClick={onClose} className="bg-white dark:bg-black/20">
            Cancel
          </ShimmerButton>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal; 