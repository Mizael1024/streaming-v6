'use client'

import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlayCircle, Plus, ThumbsUp, Pause, Moon, Sun, User, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useTheme } from "next-themes"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Component() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { setTheme, theme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handlePlayPause = () => {
    if (isLoggedIn) {
      setIsPlaying(!isPlaying)
    } else {
      setShowAuthModal(true)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggedIn(true)
    setShowAuthModal(false)
    setIsPlaying(true)
  }

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoggedIn(true)
    setShowAuthModal(false)
    setIsPlaying(true)
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="bg-background text-foreground min-h-screen">
      <header className="p-4 md:p-6 border-b">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-sm font-medium hover:underline">
            <ArrowLeft className="inline-block mr-2 h-4 w-4" />
            Voltar
          </Link>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Toggle theme">
              {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="User menu">
                  <User className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {isLoggedIn ? (
                  <>
                    <DropdownMenuItem>Perfil</DropdownMenuItem>
                    <DropdownMenuItem>Configurações</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>Sair</DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={() => setShowAuthModal(true)}>Entrar</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setShowAuthModal(true)}>Criar conta</DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto p-4 md:p-6">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Interestelar</h1>
          <div className="text-sm text-muted-foreground mb-4">
            <span>2014</span> • <span>2h 49min</span> • <span>Ficção Científica, Aventura, Drama</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="aspect-video bg-muted rounded-lg mb-4 relative overflow-hidden">
              <ReactPlayer
                url="https://stream.mux.com/bcckPC8qQ7NFSmiwbOFYxxh9HenhroiCfd6n7RsJTOQ.m3u8"
                width="100%"
                height="100%"
                playing={isPlaying}
                controls={true}
              />
              {!isPlaying && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Button className="text-white bg-primary hover:bg-primary/90" onClick={handlePlayPause}>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Assistir
                  </Button>
                </div>
              )}
            </div>
            
            <div className="flex space-x-2 mb-6">
              <Button 
                className="flex-1 flex items-center justify-center" 
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <>
                    <Pause className="mr-2 h-4 w-4" />
                    Pausar
                  </>
                ) : (
                  <>
                    <PlayCircle className="mr-2 h-4 w-4" />
                    Assistir
                  </>
                )}
              </Button>
              <Button variant="outline" className="flex-1 flex items-center justify-center">
                <Plus className="mr-2 h-4 w-4" />
                Minha lista
              </Button>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Sinopse</h2>
              <p className="text-sm text-muted-foreground">
                Em um futuro onde a Terra está se tornando inabitável, um grupo de astronautas viaja através de um buraco de minhoca em busca de um novo lar para a humanidade.
              </p>
            </div>
            
            <div>
              <h2 className="text-lg font-semibold mb-2">Elenco</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine'].map((actor) => (
                  <div key={actor} className="text-center">
                    <div className="w-16 h-16 bg-muted rounded-full mx-auto mb-2"></div>
                    <p className="text-sm">{actor}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Detalhes</h2>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li><span className="font-medium text-foreground">Diretor:</span> Christopher Nolan</li>
                <li><span className="font-medium text-foreground">Roteiristas:</span> Jonathan Nolan, Christopher Nolan</li>
                <li><span className="font-medium text-foreground">Estreia:</span> 7 de novembro de 2014</li>
              </ul>
            </div>
            
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Avaliações</h2>
              <div className="flex items-center space-x-2">
                <ThumbsUp className="h-4 w-4 text-primary" />
                <span className="text-xl font-bold">94%</span>
                <span className="text-sm text-muted-foreground">gostaram deste filme</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Recomendados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-[2/3] relative">
                <Image
                  src={`/placeholder.svg?height=300&width=200&text=Filme ${i}`}
                  alt={`Filme ${i}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Acesse sua conta</DialogTitle>
            <DialogDescription>
              Para assistir a este filme, você precisa estar logado.
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Criar Conta</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <form onSubmit={handleLogin}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seuemail@exemplo.com" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" type="password" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full">Entrar</Button>
                </DialogFooter>
              </form>
            </TabsContent>
            <TabsContent value="signup">
              <form onSubmit={handleCreateAccount}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" placeholder="Seu nome" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="seuemail@exemplo.com" required />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input id="password" type="password" required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="w-full">Criar Conta</Button>
                </DialogFooter>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}