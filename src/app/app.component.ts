import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { gsap } from 'gsap';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'Upload',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit{

  private el: ElementRef;
  private renderer: Renderer2;

  constructor(el: ElementRef, renderer: Renderer2) {
    this.el = el;
    this.renderer = renderer;
  }

  generateSpheres() {
    const hoverElement = this.el.nativeElement.querySelector('.image-container');
    
    if (hoverElement) {

      let spheres = [];

      // Obtenir la taille de la div 'image-container'
      const size = Math.max(hoverElement.offsetWidth, hoverElement.offsetHeight);
      const radius = size / 2;
  
      // Créer plusieurs cercles de sphères
      for (let j = 0; j < 10; j++) {
        // Définir la distance des sphères par rapport au centre pour chaque cercle
        const distanceFromCenter = radius + 100 + (j * 100); // Augmentez cette valeur pour éloigner les sphères du centre

        // Définir la taille des sphères pour chaque cercle
        const sphereSize = 10 + (j * 5);

        // Créer plusieurs sphères pour chaque cercle
        for (let i = 0; i < 50; i++) {
          // Ajout des sphères
          const sphere = this.renderer.createElement('div');
          this.renderer.addClass(sphere, 'sphere');
          this.renderer.setStyle(sphere, 'position', 'absolute');
          this.renderer.setStyle(sphere, 'top', '50%'); 
          this.renderer.setStyle(sphere, 'left', '50%'); 
          this.renderer.setStyle(sphere, 'transform', `translate(-50%, -50%) rotate(${(i * 7.2) + 0.1}deg) translateX(${distanceFromCenter}px)`);
          this.renderer.setStyle(sphere, 'transformOrigin', '0 0');
          this.renderer.setStyle(sphere, 'z-index', '-1');

          spheres.push(sphere);

          // Définir la taille de la sphère
          this.renderer.setStyle(sphere, 'width', `${sphereSize}px`); // Définir la largeur de la sphère
          this.renderer.setStyle(sphere, 'height', `${sphereSize}px`); // Définir la hauteur de la sphère

          // Changer la couleur de la sphère
          const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`; // Générer une couleur aléatoire
          this.renderer.setStyle(sphere, 'background-color', color); // Définir la couleur de la sphère

          // Créer l'animation GSAP
          let tl = gsap.timeline({ repeat: -1, yoyo: true, delay: i * 0.2 });
          tl.fromTo(sphere, 2, { autoAlpha: 0 }, { autoAlpha: 1, ease: "power1.inOut" });

          this.renderer.appendChild(hoverElement, sphere);
        }
      }
  
      // Assurez-vous que l'élément est au-dessus des sphères
      this.renderer.setStyle(hoverElement, 'z-index', '1');
    } else {
      console.error('Element with class "image-container" not found');
    }
  }

  ngAfterViewInit() {}

  title = 'exo';
  imageUrl: string | null = 'assets/img/default-pp.png';
  imageUploaded: boolean = false;

  onImageClicked() {
    const fileInput = document.getElementById('fileInput');
    fileInput?.click();
  }

  onFileSelected(event: Event) {
    const inputElement = <HTMLInputElement>event.target;
    if (inputElement.files && inputElement.files.length > 0) {
      const file:File = inputElement.files[0];
    
      if (file) {
        // Check if the file is an image.
        if (file.type !== 'image/png') {
          console.error('File is not a PNG image.', file.type);
          return;
        }
  
        // Create a URL for the file.
        const url = URL.createObjectURL(file);
  
        // Create a new Image.
        const img = new Image();
        img.onload = () => {
          // Create a canvas and draw the image onto it at the desired size.
          const canvas = document.createElement('canvas');
          canvas.width = 512;
          canvas.height = 512;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, 512, 512);
  
            // Export the image from the canvas as a data URL.
            const resizedUrl = canvas.toDataURL();
  
            // Set the image URL so it can be displayed.
            this.imageUrl = resizedUrl;
  
            // Set imageUploaded to true
            this.imageUploaded = true;
  
            // Generate the spheres after the image is uploaded
            this.generateSpheres();
  
            // TODO: Upload the file.
            // This depends on your backend. You could make a HTTP request here, for example.
            console.log(file);
          }
        };
        img.src = url;
      }
    }
  }
}