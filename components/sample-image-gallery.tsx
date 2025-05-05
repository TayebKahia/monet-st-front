// filepath: g:\monet_style_transfer_fastapi\dl-front\components\sample-image-gallery.tsx
"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Sample image pairs
const sampleImages = [
  { id: 1, original: "/samples/input_1.jpg", monet: "/samples/input_1_monet.jpg" },
  { id: 2, original: "/samples/input_2.jpg", monet: "/samples/input_2_monet.jpg" },
  { id: 3, original: "/samples/input_3.jpg", monet: "/samples/input_3_monet.jpg" },
  { id: 4, original: "/samples/input_4.jpg", monet: "/samples/input_4_monet.jpg" },
]

export function SampleImageGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % sampleImages.length)
  }
  
  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + sampleImages.length) % sampleImages.length)
  }
  
  const currentPair = sampleImages[currentIndex]
  
  return (
    <div className="bg-slate-800/20 rounded-xl border border-slate-700/50 backdrop-blur-sm p-6">
      <div className="mb-4 flex justify-between items-center">
        <h3 className="text-lg font-medium text-white">Sample Transformations</h3>
        <div className="text-sm text-slate-300">
          {currentIndex + 1} of {sampleImages.length}
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* Original Image */}
        <div className="flex-1">
          <div className="rounded-lg overflow-hidden relative aspect-[4/3]">
            <div className="absolute top-2 left-2 z-10 bg-slate-900/70 text-xs font-medium text-white px-2 py-1 rounded">
              Original
            </div>
            <Image 
              src={currentPair.original} 
              alt={`Original sample ${currentIndex + 1}`} 
              fill
              className="object-contain"
            />
          </div>
        </div>
        
        {/* Monet Style Image */}
        <div className="flex-1">
          <div className="rounded-lg overflow-hidden relative aspect-[4/3]">
            <div className="absolute top-2 left-2 z-10 bg-slate-900/70 text-xs font-medium text-white px-2 py-1 rounded">
              Monet Style
            </div>
            <Image 
              src={currentPair.monet} 
              alt={`Monet style sample ${currentIndex + 1}`} 
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
      
      {/* Navigation Controls */}
      <div className="flex justify-center gap-4 mt-6">
        <Button 
          onClick={goToPrevious}
          size="icon"
          variant="outline"
          className="border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:text-white"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <Button 
          onClick={goToNext}
          size="icon"
          variant="outline"
          className="border-slate-700 text-slate-300 hover:bg-slate-700/50 hover:text-white"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}