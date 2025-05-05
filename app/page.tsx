"use client"

import { ImageCombiner } from "@/components/image-combiner"
import { SampleImageGallery } from "@/components/sample-image-gallery"
import { Brush, Lightbulb, Zap, Image as ImageIcon, Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-800/80 backdrop-blur-sm bg-slate-900/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Brush className="h-6 w-6 text-purple-400" />
            <span className="font-bold text-lg">MonetStyle</span>
          </div>
          <div className="flex items-center space-x-4">
            <a 
              href="https://github.com/TayebKahia/Monet-Style-Transfer" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center text-slate-300 hover:text-white transition-colors"
            >
              <Github className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-20 pt-8">
          <div className="relative inline-block mb-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-amber-500">
              Monet Style Transfer
            </h1>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          </div>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-8">
            Transform your photos into stunning impressionist artwork inspired by Claude Monet&apos;s iconic style using our advanced AI.
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              onClick={() => {
                document.getElementById('transform-section')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
            >
              Try It Now
            </Button>
          </div>
          
          {/* Sample images */}
          <div className="max-w-4xl mx-auto">
            <SampleImageGallery />
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-slate-100">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="bg-purple-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Transformation</h3>
              <p className="text-slate-300">Transform your photos in seconds with our optimized TensorFlow model, no artistic skills required.</p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="bg-pink-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Authentic Style</h3>
              <p className="text-slate-300">Our CycleGAN model was trained on original Monet paintings to capture the true essence of his impressionist technique.</p>
            </div>
            <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm">
              <div className="bg-amber-500/20 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <ImageIcon className="h-6 w-6 text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">High Quality Results</h3>
              <p className="text-slate-300">Get beautiful, high-fidelity stylized images that preserve the important details of your original photos.</p>
            </div>
          </div>
        </section>

        {/* Try It Section */}
        <section id="transform-section" className="mb-20 scroll-mt-8">
          <div className="bg-gradient-to-r from-slate-800/50 to-indigo-900/30 rounded-2xl border border-slate-700/50 p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-6 text-center">Transform Your Photo</h2>
            <p className="text-center text-slate-300 max-w-2xl mx-auto mb-8">
              Upload your image and watch as our AI transforms it into Monet&apos;s impressionist style. 
              Perfect for creating unique artwork, gifts, or just exploring the beauty of AI-powered art.
            </p>
            <ImageCombiner />
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <span className="text-2xl font-bold text-purple-400">1</span>
                <div className="absolute -right-8 top-1/2 h-0.5 w-8 bg-gradient-to-r from-purple-500 to-transparent hidden md:block"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Photo</h3>
              <p className="text-slate-300">Upload any photo you&apos;d like to transform into Monet&apos;s style</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                <span className="text-2xl font-bold text-pink-400">2</span>
                <div className="absolute -right-8 top-1/2 h-0.5 w-8 bg-gradient-to-r from-pink-500 to-transparent hidden md:block"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Processing</h3>
              <p className="text-slate-300">Our TensorFlow CycleGAN model analyzes and transforms your image</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-amber-400">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Results</h3>
              <p className="text-slate-300">Download your Monet-style masterpiece in seconds</p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Brush className="h-5 w-5 text-purple-400" />
              <span className="font-bold">MonetStyle</span>
            </div>
            <div className="text-slate-400 text-sm">
              &copy; {new Date().getFullYear()} MonetStyle. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
