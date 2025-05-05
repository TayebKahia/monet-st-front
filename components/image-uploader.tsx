"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageUploaderProps {
  imageFile: File | null
  setImageFile: (file: File | null) => void
  label: string
  disabled?: boolean
}

export function ImageUploader({ imageFile, setImageFile, label, disabled = false }: ImageUploaderProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      setImageFile(file)
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (disabled) return

    const file = e.dataTransfer.files?.[0] || null
    if (file) {
      setImageFile(file)
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)
    }
  }

  const clearImage = () => {
    setImageFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 overflow-hidden hover:border-purple-500/50 transition-colors">
      <CardContent className="p-0">
        <div className="p-4 border-b border-slate-700 bg-gradient-to-r from-slate-800 to-slate-800/50">
          <h3 className="text-lg font-medium text-white flex items-center">
            <Upload className="h-4 w-4 mr-2 text-purple-400" />
            {label}
          </h3>
        </div>

        <div
          className={`relative flex flex-col items-center justify-center p-6 min-h-[300px] transition-all ${
            disabled ? "opacity-60" : "cursor-pointer"
          } ${!previewUrl ? "bg-slate-800/20 hover:bg-slate-800/30" : ""}`}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => !disabled && !previewUrl && fileInputRef.current?.click()}
        >
          {previewUrl ? (
            <div className="relative w-full h-[300px]">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/80 z-10"></div>
              <Image src={previewUrl} alt="Preview" fill className="object-contain" />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-slate-300 truncate max-w-[70%]">
                    <span className="bg-slate-800/80 backdrop-blur-sm px-2 py-1 rounded">
                      {imageFile?.name || "Uploaded image"}
                    </span>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      clearImage();
                    }}
                    disabled={disabled}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center max-w-md">
              <div className="bg-purple-500/10 rounded-full p-6 mb-6 ring-2 ring-purple-500/20">
                <Upload className="h-10 w-10 text-purple-400" />
              </div>
              <h4 className="text-white font-medium text-lg mb-2">Drop your image here</h4>
              <p className="text-slate-300 mb-6">
                Upload any photo you&apos;d like to transform into Monet&apos;s style
              </p>
              
              <div className="w-full bg-slate-700/30 rounded-lg p-4 mb-6">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 rounded-full bg-emerald-500 mr-2"></div>
                  <p className="text-emerald-300 text-sm">Supported formats: JPG, PNG</p>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 rounded-full bg-amber-500 mr-2"></div>
                  <p className="text-amber-300 text-sm">Best results with landscape photos, nature scenes</p>
                </div>
              </div>
              
              <Button variant="secondary" className="bg-purple-600 hover:bg-purple-700 text-white" disabled={disabled}>
                Select Image
              </Button>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={disabled}
          />
        </div>
      </CardContent>
    </Card>
  )
}
