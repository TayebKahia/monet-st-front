import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Image from "next/image"

interface ResultDisplayProps {
  resultImageUrl: string
  originalImageUrl?: string
}

export function ResultDisplay({ resultImageUrl, originalImageUrl }: ResultDisplayProps) {
  const handleDownload = () => {
    // Create an anchor element and set the href to the image
    const link = document.createElement('a')
    link.href = resultImageUrl
    link.download = 'monet-style-image.jpg' 
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700 overflow-hidden">
      <CardContent className="p-0">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h3 className="text-xl font-medium text-white">Monet Masterpiece</h3>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10"
              onClick={handleDownload}
            >
              <Download className="h-4 w-4 mr-1" /> Download
            </Button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Original Image */}
            {originalImageUrl && (
              <div className="flex-1">
                <div className="rounded-lg overflow-hidden relative aspect-[4/3]">
                  <div className="absolute top-2 left-2 z-10 bg-slate-900/70 text-xs font-medium text-white px-2 py-1 rounded">
                    Original
                  </div>
                  <Image
                    src={originalImageUrl}
                    alt="Original image"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
            
            {/* Monet Style Image */}
            <div className="flex-1">
              <div className="rounded-lg overflow-hidden relative aspect-[4/3]">
                <div className="absolute top-2 left-2 z-10 bg-slate-900/70 text-xs font-medium text-white px-2 py-1 rounded">
                  Monet Style
                </div>
                <Image
                  src={resultImageUrl}
                  alt="Monet style image result"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-800/30 border-t border-slate-700">
          <div className="flex flex-wrap justify-between items-center">
            <div className="text-slate-300 text-sm mb-2 md:mb-0">
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs mr-2">
                100% Complete
              </span>
              Transform successful
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
