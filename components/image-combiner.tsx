"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ImageUploader } from "@/components/image-uploader"
import { ResultDisplay } from "@/components/result-display"
import { LoadingSpinner } from "@/components/loading-spinner"
import { AlertCircle, Wand2, Info } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { motion, AnimatePresence } from "framer-motion"

export function ImageCombiner() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [processingTime, setProcessingTime] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const resultSectionRef = useRef<HTMLDivElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setSelectedFile(file)
    setResultImage(null)
    setError(null)
    
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedFile) {
      setError("Please select an image")
      return
    }
    
    setLoading(true)
    setError(null)
    
    try {
      const formData = new FormData()
      formData.append("file", selectedFile)
      
      // Use the Next.js API proxy route instead of direct backend call
      const response = await fetch("/api/proxy-generate", {
        method: "POST",
        body: formData,
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to process image")
      }
      
      const data = await response.json()
      setResultImage(data.image)
      setProcessingTime(data.processing_time_ms)
    } catch (error) {
      console.error("Error:", error)
      setError(error instanceof Error ? error.message : "Failed to process image")
    } finally {
      setLoading(false)
    }
  }

  const resetAll = () => {
    setSelectedFile(null)
    setPreview(null)
    setResultImage(null)
    setError(null)
    setProcessingTime(null)
  }

  // Scroll to result when available
  useEffect(() => {
    if (resultImage && resultSectionRef.current) {
      resultSectionRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
      
      resultSectionRef.current.setAttribute('tabindex', '-1');
      resultSectionRef.current.focus({ preventScroll: true });
    }
  }, [resultImage]);

  return (
    <div className="max-w-6xl mx-auto">
      <AnimatePresence mode="wait">
        {!resultImage ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mx-auto max-w-xl mb-8"
          >
            <ImageUploader imageFile={selectedFile} setImageFile={setSelectedFile} label="Upload Image" disabled={loading} />
            
            {selectedFile && (
              <div className="text-center mt-4 text-sm text-slate-400 flex items-center justify-center">
                <Info className="h-3 w-3 mr-1" />
                Click Transform when ready to convert your image to Monet style
              </div>
            )}

            <motion.div 
              className="flex justify-center mt-8"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ 
                opacity: selectedFile ? 1 : 0.5, 
                scale: selectedFile ? 1 : 0.95 
              }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={handleSubmit}
                disabled={!selectedFile || loading}
                size="lg"
                className={`
                  relative overflow-hidden transition-all duration-300
                  ${selectedFile 
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-700/30" 
                    : "bg-slate-700 hover:bg-slate-600"
                  } text-white px-8 py-6
                `}
              >
                {loading ? (
                  <div className="flex items-center">
                    <LoadingSpinner className="mr-2" />
                    <div className="flex flex-col items-start">
                      <span>Transforming...</span>
                      <span className="text-xs opacity-75">This may take a few seconds</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Wand2 className="mr-2 h-5 w-5" />
                    <span>Transform to Monet Style</span>
                  </div>
                )}
                
                {selectedFile && !loading && (
                  <div className="absolute inset-0 -z-10">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 animate-pulse"></div>
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-slide"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-slide-reverse"></div>
                  </div>
                )}
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Alert variant="destructive" className="border border-red-500/20 backdrop-blur-sm">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      {resultImage && (
        <motion.div 
          ref={resultSectionRef}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8"
        >
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Your Monet Masterpiece
            </h2>
            {processingTime && (
              <p className="text-sm text-slate-400 mt-1">
                Processed in {(processingTime / 1000).toFixed(2)} seconds
              </p>
            )}
          </div>
          
          <ResultDisplay resultImageUrl={resultImage} originalImageUrl={preview || undefined} />
          
          <div className="flex justify-center mt-8">
            <Button 
              onClick={resetAll} 
              variant="outline"
              size="lg"
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
            >
              Create Another Masterpiece
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
