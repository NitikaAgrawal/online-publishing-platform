import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArticleService } from '../../../services/article.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { QuillModule } from 'ngx-quill';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-article-editor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, QuillModule],
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent {
  private fb = inject(FormBuilder);
  private articleService = inject(ArticleService);
  private authService = inject(AuthService);
  private router = inject(Router);

  editorForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(200)]],
    description: ['', [Validators.required, Validators.maxLength(500)]],
    content: ['', Validators.required],
    tags: [[] as string[]],
    isFeatured: [false],
    isEditorsPick: [false],
    publishNow: [true],
    scheduledDate: [''],
    status: ['published' as const]
  });

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': 1 }, { 'header': 2 }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image', 'video'],
    ]
  };

  updateTags(event: Event) {
    const input = event.target as HTMLInputElement;
    const tags = input.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    this.editorForm.patchValue({ tags });
  }  

  onSubmit() {
    if (this.editorForm.valid) {
      const formValue = this.editorForm.value;
      const currentUser = this.authService.getCurrentUser();
      
      if (!currentUser) return;

      const articleData = {
        title: formValue.title!,
        description: formValue.description!,
        content: formValue.content!,
        authorId: currentUser.id,
        tags: formValue.tags || [],
        isFeatured: formValue.isFeatured || false,
        isEditorsPick: formValue.isEditorsPick || false,
        status: formValue.status || 'published'
      };

      this.articleService.createArticle(articleData);
      this.router.navigate(['/articles']);
    }
  }
} 