import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';
import { ArticleService } from '../services/article.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuillModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  private fb = inject(FormBuilder);
  private articleService = inject(ArticleService);
  private authService = inject(AuthService);
  private router = inject(Router);

  categories = ['Technology', 'Business', 'Science', 'Health', 'Entertainment', 'Sports'];
  imagePreview: string | null = null;
  showPreview = false;
  selectedFile: File | null = null;

  postForm = this.fb.group({
    title: ['', Validators.required],
    category: ['', Validators.required],
    description: ['', Validators.required]
  });

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
      ['clean'],
    ]
  };

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  previewPost() {
    this.showPreview = true;
  }

  onSubmit() {
    if (this.postForm.valid) {
      const currentUser = this.authService.getCurrentUser();
      if (!currentUser) return;

      const formValue = this.postForm.value;
      
      const articleData = {
        title: formValue.title!,
        description: formValue.description!,
        content: formValue.description!,
        authorId: currentUser.id,
        tags: [formValue.category!],
        category: formValue.category!,
        thumbnail: this.imagePreview || undefined,
        isFeatured: false,
        isEditorsPick: false,
        status: 'published'
      };

      this.articleService.createArticle(articleData);
      this.router.navigate(['/articles']);
    }
  }
}